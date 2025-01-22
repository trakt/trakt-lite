import type { MediaType } from '$lib/requests/models/MediaType';
import type { Paginatable } from '$lib/requests/models/Paginatable';
import {
  movieTrendingQuery,
  type TrendingMovie,
} from '$lib/requests/queries/movies/movieTrendingQuery.ts';
import {
  showTrendingQuery,
  type TrendingShow,
} from '$lib/requests/queries/shows/showTrendingQuery.ts';
import { time } from '$lib/utils/timing/time.ts';
import { createQuery, type CreateQueryOptions } from '@tanstack/svelte-query';
import { derived } from 'svelte/store';

export type TrendingEntry = TrendingMovie | TrendingShow;

type TrendingListStoreProps = {
  type: MediaType;
  limit?: number;
  page?: number;
};

function typeToQuery(
  { type, limit, page }: TrendingListStoreProps,
) {
  const params = {
    limit,
    page,
  };

  switch (type) {
    case 'movie':
      return movieTrendingQuery(params) as CreateQueryOptions<
        Paginatable<TrendingEntry>
      >;
    case 'show':
      return showTrendingQuery(params) as CreateQueryOptions<
        Paginatable<TrendingEntry>
      >;
  }
}

export function useTrendingList(
  { type, limit, page }: TrendingListStoreProps,
) {
  const query = createQuery({
    ...typeToQuery({ type, limit, page }),
    staleTime: time.hours(1),
  });

  return {
    list: derived(query, ($query) => $query.data?.entries ?? []),
    page: derived(
      query,
      ($query) => $query.data?.page ?? { page: 0, total: 0 },
    ),
  };
}
