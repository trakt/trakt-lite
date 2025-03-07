import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { mapToEpisodeCount } from '$lib/requests/_internal/mapToEpisodeCount.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { EpisodeCountSchema } from '$lib/requests/models/EpisodeCount.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import type { LimitParams } from '$lib/requests/models/LimitParams.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { RecommendedShowResponse } from '@trakt/api';
import { z } from 'zod';
import { mapToShowEntry } from '../../_internal/mapToShowEntry.ts';
import { MediaEntrySchema } from '../../models/MediaEntry.ts';

export const RecommendedShowSchema = MediaEntrySchema.merge(EpisodeCountSchema);
export type RecommendedShow = z.infer<typeof RecommendedShowSchema>;

type RecommendedShowsParams = LimitParams & ApiParams;

const recommendedShowsRequest = (
  { fetch, limit }: RecommendedShowsParams,
) =>
  api({ fetch })
    .recommendations
    .shows
    .recommend({
      query: {
        extended: 'full,images',
        ignore_collected: true,
        ignore_watchlisted: true,
        ignore_watched: true,
        limit,
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error(
          'The recommended shows, like elusive phantoms, refuse to materialize.',
        );
      }

      return body;
    });

export const recommendedShowsQuery = defineQuery({
  key: 'recommendedShows',
  invalidations: [
    InvalidateAction.MarkAsWatched('show'),
    InvalidateAction.Watchlisted('show'),
    InvalidateAction.MarkAsWatched('episode'),
  ],
  dependencies: (params) => [params.limit],
  request: recommendedShowsRequest,
  mapper: (body) =>
    body.map((show: RecommendedShowResponse[0]) => ({
      ...mapToShowEntry(show),
      ...mapToEpisodeCount(show),
    })),
  schema: RecommendedShowSchema.array(),
  ttl: time.hours(24),
});
