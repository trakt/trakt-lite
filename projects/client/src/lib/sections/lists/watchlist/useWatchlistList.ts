import type { SortType } from '$lib/api.ts';
import { useQuery } from '$lib/features/query/useQuery';
import type { MediaType } from '$lib/requests/models/MediaType';
import {
  movieWatchlistQuery,
  type WatchlistMovie,
} from '$lib/requests/queries/users/movieWatchlistQuery.ts';
import {
  showWatchlistQuery,
  type WatchlistShow,
} from '$lib/requests/queries/users/showWatchlistQuery.ts';
import { toLoadingState } from '$lib/utils/requests/toLoadingState';
import { derived } from 'svelte/store';

export type WatchListParams = {
  sort: SortType;
};

export type WatchlistMediaItem = WatchlistMovie | WatchlistShow;
export type WatchlistMediaList = Array<WatchlistMediaItem>;

export type WatchListStoreProps = {
  type: MediaType;
} & Partial<WatchListParams>;

function typeToQuery(
  { type, sort = 'rank' }: WatchListStoreProps,
) {
  const params: WatchListParams = {
    sort,
  };

  switch (type) {
    case 'movie':
      return movieWatchlistQuery(params);
    case 'show':
      return showWatchlistQuery(params);
  }
}

export function useWatchlistList(params: WatchListStoreProps) {
  const query = useQuery(typeToQuery(params));
  const list = derived(
    query,
    ($query) => ($query.data ?? []).map((item) => item.entry),
  );
  const isLoading = derived(
    query,
    toLoadingState,
  );

  return {
    list,
    isLoading,
  };
}
