import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { mapToMediaStats } from '$lib/requests/_internal/mapToMediaStats.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { MediaStatsSchema } from '$lib/requests/models/MediaStats.ts';
import { time } from '$lib/utils/timing/time.ts';

type MovieStatsParams = {
  slug: string;
} & ApiParams;

const movieStatsRequest = (
  { fetch, slug }: MovieStatsParams,
) =>
  api({ fetch })
    .movies
    .stats({
      params: {
        id: slug,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch movie stats');
      }

      return response.body;
    });

export const movieStatsQuery = defineQuery({
  key: 'movieStats',
  invalidations: [],
  dependencies: (params) => [params.slug],
  request: movieStatsRequest,
  mapper: mapToMediaStats,
  schema: MediaStatsSchema,
  ttl: time.minutes(30),
});
