import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { mapStatsResponseToMediaStats } from '$lib/requests/_internal/mapStatsResponseToMediaStats.ts';
import { MediaStatsSchema } from '$lib/requests/models/MediaStats.ts';
import { api, type ApiParams } from '../../_internal/api.ts';

type EpisodeStatsParams = {
  slug: string;
  season: number;
  episode: number;
} & ApiParams;

const episodeStatsRequest = (
  { fetch, slug, season, episode }: EpisodeStatsParams,
) =>
  api({ fetch })
    .shows
    .episode
    .stats({
      params: {
        id: slug,
        season,
        episode,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch episode stats');
      }

      return response.body;
    });

export const episodeStatsQuery = await defineQuery({
  key: 'episodeStats',
  invalidations: [],
  dependencies: (params) => [params.slug, params.season, params.episode],
  request: episodeStatsRequest,
  mapper: mapStatsResponseToMediaStats,
  schema: MediaStatsSchema,
});
