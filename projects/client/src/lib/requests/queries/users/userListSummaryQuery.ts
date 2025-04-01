import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapToMediaListSummary } from '../../_internal/mapToMediaListSummary.ts';
import { MediaListSummarySchema } from '../../models/MediaListSummary.ts';

type UserListSummaryParams = { userId: string; listId: string } & ApiParams;

const userListSummaryRequest = (
  { fetch, userId, listId }: UserListSummaryParams,
) =>
  api({ fetch })
    .users
    .lists
    .list
    .summary({
      params: {
        id: userId,
        list_id: listId,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch list summary');
      }

      return response.body;
    });

export const userListSummaryQuery = defineQuery({
  key: 'userListSummary',
  invalidations: [],
  dependencies: (params) => [params.userId, params.listId],
  request: userListSummaryRequest,
  mapper: mapToMediaListSummary,
  schema: MediaListSummarySchema,
  ttl: time.minutes(30),
});
