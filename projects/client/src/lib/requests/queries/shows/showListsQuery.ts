import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapListResponseToMediaListSummary } from '../../_internal/mapListResponseToMediaListSummary.ts';
import { MediaListSummarySchema } from '../../models/MediaListSummary.ts';

type ShowListsParams = { slug: string; limit: number } & ApiParams;

const showListsRequest = (
  { fetch, slug, limit }: ShowListsParams,
) =>
  api({ fetch })
    .shows
    .lists({
      params: {
        id: slug,
        type: 'all',
        sort: 'popular',
      },
      query: {
        extended: 'images',
        limit,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch show lists');
      }

      return response.body;
    });

export const showListsQuery = defineQuery({
  key: 'showLists',
  invalidations: [],
  dependencies: (params) => [params.slug],
  request: showListsRequest,
  mapper: (data) => data.map(mapListResponseToMediaListSummary),
  schema: MediaListSummarySchema.array(),
  ttl: time.minutes(30),
});
