import { useUser } from '$lib/features/auth/stores/useUser.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import { addToFavoritesRequest } from '$lib/requests/sync/addToFavoritesRequest.ts';
import { removeFromFavoritesRequest } from '$lib/requests/sync/removeFromFavoritesRequest.ts';
import { useInvalidator } from '$lib/stores/useInvalidator.ts';
import { derived, writable } from 'svelte/store';

export type FavoritesStoreProps = {
  type: MediaType;
  id: number;
};

function getFavoritesPayload({ type, id }: FavoritesStoreProps) {
  switch (type) {
    case 'movie':
      return { movies: [{ ids: { trakt: id } }] };
    case 'show':
      return { shows: [{ ids: { trakt: id } }] };
  }
}

export function useFavorites({ type, id }: FavoritesStoreProps) {
  const isUpdatingFavorite = writable(false);
  const { favorites } = useUser();
  const { invalidate } = useInvalidator();

  const isFavorited = derived(
    favorites,
    ($favorites) => {
      if (!$favorites) {
        return false;
      }

      switch (type) {
        case 'movie':
          return $favorites.movies.has(id);
        case 'show':
          return $favorites.shows.has(id);
      }
    },
  );

  const addOrRemoveFavorite = async (action: 'add' | 'remove') => {
    isUpdatingFavorite.set(true);

    const payload = getFavoritesPayload({ type, id });

    switch (action) {
      case 'add':
        await addToFavoritesRequest({ body: payload });
        break;
      case 'remove':
        await removeFromFavoritesRequest({ body: payload });
        break;
    }

    await invalidate(InvalidateAction.Favorited(type));

    isUpdatingFavorite.set(false);
  };

  return {
    isUpdatingFavorite,
    isFavorited,
    addToFavorites: async () => await addOrRemoveFavorite('add'),
    removeFromFavorites: async () => await addOrRemoveFavorite('remove'),
  };
}
