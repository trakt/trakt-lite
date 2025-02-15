import { useQuery } from '$lib/features/query/useQuery.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import { movieListsQuery } from '$lib/requests/queries/movies/movieListsQuery.ts';
import { showListsQuery } from '$lib/requests/queries/shows/showListsQuery.ts';
import { toLoadingState } from '$lib/utils/requests/toLoadingState.ts';
import { derived } from 'svelte/store';

const MAX_LISTS = 10;

type ListSummaryProps = {
  slug: string;
  type: MediaType;
};

function typeToQuery(
  { slug, type }: ListSummaryProps,
) {
  const params = { slug, limit: MAX_LISTS };

  switch (type) {
    case 'movie':
      return movieListsQuery(params);
    case 'show':
      return showListsQuery(params);
  }
}

export function usePopularListSummary({ slug, type }: ListSummaryProps) {
  const lists = useQuery(typeToQuery({ slug, type }));

  const isLoading = derived(
    lists,
    toLoadingState,
  );

  return {
    isLoading,
    lists: derived(lists, ($lists) => $lists.data ?? []),
  };
}
