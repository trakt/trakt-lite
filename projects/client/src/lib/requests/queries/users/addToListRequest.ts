import { api, type ApiParams } from '$lib/requests/api.ts';
import type { WatchlistRequest } from '@trakt/api';

type AddToListParams = {
  body: WatchlistRequest;
  listId: string;
} & ApiParams;

export function addToListRequest(
  { body, fetch, listId }: AddToListParams,
): Promise<boolean> {
  return api({ fetch })
    .users
    .lists
    .list
    .add({
      params: {
        id: 'me',
        list_id: listId,
      },
      body,
    })
    .then(({ status }) => status === 201);
}
