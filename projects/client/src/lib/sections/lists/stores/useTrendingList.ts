import type { MediaType } from '$lib/models/MediaType.ts';
import type { Paginatable } from '$lib/models/Paginatable';
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

export type TrendingMediaItem = TrendingMovie | TrendingShow;

type TrendingListStoreProps = {
  type: MediaType;
  limit?: number;
};

function typeToQuery(
  { type, limit }: TrendingListStoreProps,
): CreateQueryOptions<Paginatable<TrendingMediaItem>> {
  const params = {
    limit,
  };

  switch (type) {
    case 'movie':
      return movieTrendingQuery(params);
    case 'show':
      return showTrendingQuery(params);
  }
}

export function useTrendingList(
  { type, limit = 25 }: TrendingListStoreProps,
) {
  const query = createQuery({
    ...typeToQuery({ type, limit }),
    staleTime: time.hours(1),
  });
  const list = derived(query, ($query) => $query.data?.entries ?? []);

  return {
    list,
  };
}
