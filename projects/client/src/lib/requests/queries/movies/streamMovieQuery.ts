import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapToStreamingServices } from '../../_internal/mapToStreamingServices.ts';
import { StreamingServiceOptionsSchema } from '../../models/StreamingServiceOptions.ts';

type StreamMovieParams = {
  slug: string;
  country: string;
} & ApiParams;

const streamMovieRequest = (
  { fetch, slug, country }: StreamMovieParams,
) =>
  api({ fetch })
    .movies
    .watchnow({
      params: {
        id: slug,
        country,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch movie streaming services');
      }

      return response.body;
    });

export const streamMovieQuery = defineQuery({
  key: 'streamMovie',
  invalidations: [],
  dependencies: (params) => [params.slug, params.country],
  request: streamMovieRequest,
  mapper: (response, params) =>
    mapToStreamingServices(response, params.country),
  schema: StreamingServiceOptionsSchema,
  ttl: time.days(1),
});
