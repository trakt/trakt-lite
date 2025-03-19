import { useMediaFilters } from '$lib/features/filters/useMediaFilters.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import type { Paginatable } from '$lib/requests/models/Paginatable.ts';
import type { PaginationParams } from '$lib/requests/models/PaginationParams.ts';
import {
  movieTrendingQuery,
  type TrendingMovie,
} from '$lib/requests/queries/movies/movieTrendingQuery.ts';
import {
  showTrendingQuery,
  type TrendingShow,
} from '$lib/requests/queries/shows/showTrendingQuery.ts';
import { usePaginatedListQuery } from '$lib/sections/lists/stores/usePaginatedListQuery.ts';
import { type CreateQueryOptions } from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export type TrendingEntry = TrendingMovie | TrendingShow;
export type TrendingMediaList = Paginatable<TrendingEntry>;

type TrendingListStoreProps = PaginationParams & {
  type: MediaType;
};

function typeToQuery(
  params: TrendingListStoreProps,
) {
  switch (params.type) {
    case 'movie':
      return movieTrendingQuery(params) as CreateQueryOptions<
        TrendingMediaList
      >;
    case 'show':
      return showTrendingQuery(params) as CreateQueryOptions<TrendingMediaList>;
  }
}

export function useTrendingList(
  props: TrendingListStoreProps,
) {
  const response = usePaginatedListQuery(typeToQuery(props));

  const mediaEntries = get(response.list);
  const filters = useMediaFilters(mediaEntries);

  return {
    ...response,
    filters,
  };
}
