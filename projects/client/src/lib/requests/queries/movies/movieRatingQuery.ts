import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { MediaRatingSchema } from '$lib/requests/models/MediaRating.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapToMediaRating } from '../../_internal/mapToMediaRating.ts';

type MovieRatingParams = { slug: string } & ApiParams;

const movieRatingRequest = (
  { fetch, slug }: MovieRatingParams,
) =>
  api({ fetch })
    .movies
    .ratings({
      params: {
        id: slug,
      },
      query: {
        extended: 'all',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch movie rating');
      }

      return response.body;
    });

export const movieRatingQuery = defineQuery({
  key: 'movieRating',
  invalidations: [],
  dependencies: (params) => [params.slug],
  request: movieRatingRequest,
  mapper: mapToMediaRating,
  schema: MediaRatingSchema,
  ttl: time.days(1),
});
