import type { WatchlistRequest } from '@trakt/api';
import { api, type ApiParams } from '../_internal/api.ts';

type AddToWatchlistParams = {
  body: WatchlistRequest;
} & ApiParams;

export function addToWatchlistRequest(
  { body, fetch }: AddToWatchlistParams,
): Promise<boolean> {
  return api({ fetch })
    .sync
    .watchlist
    .add({
      body,
    })
    .then(({ status }) => status === 201);
}
