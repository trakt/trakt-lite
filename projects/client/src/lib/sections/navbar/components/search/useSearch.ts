import { browser } from '$app/environment';
import { AbortError, abortRequest } from '$lib/api.ts';
import {
  searchCancellationId,
  searchQuery,
  type SearchResult,
} from '$lib/requests/queries/search/searchQuery.ts';
import { useMedia, WellKnownMediaQuery } from '$lib/stores/css/useMedia.ts';
import { debounce } from '$lib/utils/timing/debounce.ts';
import { time } from '$lib/utils/timing/time.ts';
import { CancelledError, useQueryClient } from '@tanstack/svelte-query';
import { onDestroy } from 'svelte';
import { derived, get, writable } from 'svelte/store';

export function useSearch() {
  type SearchResponse = {
    items: SearchResult[];
    reason: 'initial' | 'result' | 'cancelled';
  };

  const results = writable<SearchResponse>({
    items: [] as SearchResult[],
    reason: 'initial',
  });
  const client = browser ? useQueryClient() : undefined;
  const isSearching = writable(false);
  const isDesktop = useMedia(WellKnownMediaQuery.desktop);

  async function search(query: string) {
    if (!client) {
      return;
    }

    if (!query.trim()) {
      results.set({
        items: [],
        reason: 'initial',
      });
      return;
    }

    const response = await client.fetchQuery({
      ...searchQuery({
        query,
      }),
      staleTime: time.minutes(5),
    })
      .then((response) => ({
        items: response,
        reason: 'result',
      } as SearchResponse))
      .catch((error) => {
        if (error instanceof AbortError) {
          return Promise.resolve<SearchResponse>({
            ...get(results),
            reason: 'cancelled',
          });
        }

        if (error instanceof CancelledError) {
          return Promise.resolve<SearchResponse>({
            items: [],
            reason: 'cancelled',
          });
        }

        return Promise.reject(error);
      });

    results.set({
      items: response
        .items
        .filter((result) => result.year != null),
      reason: response.reason,
    });
  }

  const unsubscribeFromResults = results
    .subscribe(({ reason }) => isSearching.set(reason === 'cancelled'));

  onDestroy(() => unsubscribeFromResults());

  function clear() {
    abortRequest(
      (id) => id.includes(searchCancellationId()),
      new CancelledError(),
    );
    results.set({ items: [], reason: 'initial' });
  }

  return {
    search: (term: string) => {
      isSearching.set(true);
      debounce(search, get(isDesktop) ? 150 : 250)(term);
    },
    clear,
    results: derived(results, ($results) => $results.items ?? []),
    isSearching,
  };
}
