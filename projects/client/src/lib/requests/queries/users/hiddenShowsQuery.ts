import type { HiddenShowItemResponse } from '$lib/api.ts';
import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { extractPageMeta } from '$lib/requests/_internal/extractPageMeta.ts';
import { mapToShowEntry } from '$lib/requests/_internal/mapToShowEntry.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import {
  type HiddenShow,
  HiddenShowSchema,
} from '$lib/requests/models/HiddenShow.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { PaginatableSchemaFactory } from '$lib/requests/models/Paginatable.ts';
import { time } from '$lib/utils/timing/time.ts';

type HiddenShowsParams = {
  page?: number;
  limit?: number;
} & ApiParams;

function mapToHiddenShowItem(item: HiddenShowItemResponse): HiddenShow {
  return {
    hiddenAt: new Date(item.hidden_at),
    show: mapToShowEntry(item.show),
  };
}

export const DEFAULT_HIDDEN_PAGE_SIZE = 100;
const hiddenShowsRequest = (
  { fetch, limit = DEFAULT_HIDDEN_PAGE_SIZE, page = 1 }: HiddenShowsParams,
) =>
  api({ fetch })
    .users
    .hidden
    .get
    .shows({
      query: {
        page,
        limit,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch hidden shows');
      }

      return response;
    });

export const hiddenShowsQuery = defineQuery({
  key: 'hiddenShows',
  invalidations: [InvalidateAction.Restore],
  dependencies: (
    params: HiddenShowsParams,
  ) => [params.limit, params.page],
  request: hiddenShowsRequest,
  mapper: (response) => ({
    entries: response.body.map(mapToHiddenShowItem),
    page: extractPageMeta(response.headers),
  }),
  schema: PaginatableSchemaFactory(HiddenShowSchema),
  ttl: time.days(1),
});
