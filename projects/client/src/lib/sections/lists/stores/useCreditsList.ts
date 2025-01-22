import type { MediaEntry } from '$lib/requests/models/MediaEntry';
import type { MediaType } from '$lib/requests/models/MediaType';
import { peopleMovieCreditsQuery } from '$lib/requests/queries/people/peopleMovieCreditsQuery';
import { peopleShowCreditsQuery } from '$lib/requests/queries/people/peopleShowCreditsQuery';
import { time } from '$lib/utils/timing/time';
import { createQuery, type CreateQueryOptions } from '@tanstack/svelte-query';
import { derived } from 'svelte/store';

type UseCreditsListProps = {
  type: MediaType;
  slug: string;
};

function typeToQuery(
  { type, slug }: UseCreditsListProps,
): CreateQueryOptions<MediaEntry[]> {
  const params = { slug };

  switch (type) {
    case 'movie':
      return peopleMovieCreditsQuery(params);
    case 'show':
      return peopleShowCreditsQuery(params);
  }
}

export function useCreditsList({ type, slug }: UseCreditsListProps) {
  const query = createQuery({
    ...typeToQuery({ type, slug }),
    staleTime: time.days(1),
  });

  const list = derived(query, ($query) => $query.data ?? []);

  return {
    list,
  };
}
