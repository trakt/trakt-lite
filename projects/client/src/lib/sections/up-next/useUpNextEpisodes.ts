import { browser } from '$app/environment';
import {
  type UpNextEntry,
  upNextQuery,
  upNextQueryKey,
} from '$lib/requests/queries/sync/upNextQuery.ts';
import { markAsWatchedRequest } from '$lib/requests/sync/markAsWatchedRequest.ts';
import { useStableArray } from '$lib/sections/up-next/stores/useStableArray.ts';
import { createQuery, useQueryClient } from '@tanstack/svelte-query';
import { SvelteMap } from 'svelte/reactivity';

export const useUpNextEpisodes = () => {
  const { list, set } = useStableArray<UpNextEntry>((l, r) =>
    l.show.id === r.show.id
  );

  const client = browser ? useQueryClient() : undefined;

  const query = createQuery({
    ...upNextQuery(),
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  query.subscribe((query) => {
    if (query.data == null) return;
    set(query.data);
  });

  const reload = () => {
    client?.resetQueries({
      queryKey: upNextQueryKey,
    });
  };

  const episodeLoadingMap = new SvelteMap<number, boolean>();

  const markAsWatched = async (id: number) => {
    episodeLoadingMap.set(id, true);
    await markAsWatchedRequest({
      body: {
        episodes: [
          {
            ids: { trakt: id },
            watched_at: new Date().toISOString(),
          },
        ],
      },
    });
    episodeLoadingMap.set(id, false);
  };

  const isLoading = (id: number) => episodeLoadingMap.get(id) ?? false;

  return {
    list,
    reload,
    markAsWatched,
    isLoading,
  };
};
