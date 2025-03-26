import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapToMediaListSummary } from '../../_internal/mapToMediaListSummary.ts';
import { MediaListSummarySchema } from '../../models/MediaListSummary.ts';

type PersonalListsParams = { slug: string } & ApiParams;

const personalListsRequest = (
  { fetch, slug }: PersonalListsParams,
) =>
  api({ fetch })
    .users
    .lists
    .personal({
      params: {
        id: slug,
      },
      query: {
        extended: 'images',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch user lists');
      }

      return response.body;
    });

export const personalListsQuery = defineQuery({
  key: 'personalLists',
  invalidations: [],
  dependencies: (params) => [params.slug],
  request: personalListsRequest,
  mapper: (data) => data.map(mapToMediaListSummary),
  schema: MediaListSummarySchema.array(),
  ttl: time.minutes(30),
});
