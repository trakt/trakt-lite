import type { MediaType } from '$lib/models/MediaType.ts';
import { type MovieSummary } from '$lib/requests/models/MovieSummary.ts';
import { movieRelatedQuery } from '$lib/requests/queries/movies/movieRelatedQuery.ts';
import {
  type PopularShow,
} from '$lib/requests/queries/shows/showPopularQuery.ts';
import { showRelatedQuery } from '$lib/requests/queries/shows/showRelatedQuery.ts';
import { time } from '$lib/utils/timing/time.ts';
import { createQuery, type CreateQueryOptions } from '@tanstack/svelte-query';
import { derived } from 'svelte/store';

export type RelatedMediaItem = PopularShow | MovieSummary;
export type RelatedMedia = Array<RelatedMediaItem>;

type PopularListStoreProps = {
  type: MediaType;
  slug: string;
};

function typeToQuery(
  { type, slug }: PopularListStoreProps,
): CreateQueryOptions<RelatedMedia> {
  const params = { slug };

  switch (type) {
    case 'movie':
      return movieRelatedQuery(params);
    case 'show':
      return showRelatedQuery(params);
  }
}

export function useRelatedList(
  { type, slug }: PopularListStoreProps,
) {
  const query = createQuery({
    ...typeToQuery({ type, slug }),
    staleTime: time.days(7),
  });
  const list = derived(query, ($query) => $query.data ?? []);

  return {
    list,
  };
}
