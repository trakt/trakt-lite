import { useUser } from '$lib/features/auth/stores/useUser.ts';
import type { Rating } from '$lib/models/Ratings.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { addRatingRequest } from '$lib/requests/sync/addRatingRequest.ts';
import { addToFavoritesRequest } from '$lib/requests/sync/addToFavoritesRequest.ts';
import { removeFromFavoritesRequest } from '$lib/requests/sync/removeFromFavoritesRequest.ts';
import type { RatingsRequest } from '@trakt/api';
import { derived, writable } from 'svelte/store';
import { mapRatingToSimpleRating } from './_internal/mapRatingToSimpleRating.ts';
import { useInvalidator } from './useInvalidator.ts';

type RatableItem = 'movie' | 'episode';

export type WatchlistStoreProps = {
  type: RatableItem;
  id: number;
};

function toRatingPayload(
  type: RatableItem,
  id: number,
  rating: Rating,
): RatingsRequest {
  const ratingPayload = {
    ids: { trakt: id },
    rating: rating.value,
  };

  switch (type) {
    case 'movie':
      return {
        movies: [ratingPayload],
      };
    case 'episode':
      return {
        episodes: [ratingPayload],
      };
  }
}

function favoriteQueryFactory(
  rating: Rating,
  isFavorited: boolean,
) {
  if (!isFavorited && rating.simple === 'great') {
    return addToFavoritesRequest;
  }

  if (isFavorited && rating.simple !== 'great') {
    return removeFromFavoritesRequest;
  }
}

export function useRatings({ type, id }: WatchlistStoreProps) {
  const isRating = writable(false);
  const { ratings, favorites } = useUser();
  const { invalidate } = useInvalidator();

  const isFavorited = derived(
    favorites,
    ($favorites) => {
      if (!$favorites || type === 'episode') {
        return false;
      }

      return $favorites.movies.has(id);
    },
  );

  const rating = derived(
    ratings,
    ($ratings) => {
      if (!$ratings) {
        return;
      }

      switch (type) {
        case 'movie':
          return $ratings.movies.get(id);
        case 'episode':
          return $ratings.episodes.get(id);
      }
    },
  );

  const currentRating = derived(
    rating,
    ($rating) => {
      if (!$rating) {
        return;
      }

      return mapRatingToSimpleRating($rating.rating);
    },
  );

  /**
   *  TODO: implement some sort of in-memory cache for result of action response
   *  that will allow to show optimistic UI updates while history is being updated
   */
  const addRating = async (rating: Rating, isFavorited: boolean) => {
    isRating.set(true);
    await addRatingRequest({
      body: toRatingPayload(type, id, rating),
    });
    await invalidate(InvalidateAction.Rated(type));

    const favoritesQuery = favoriteQueryFactory(rating, isFavorited);
    if (type === 'movie' && favoritesQuery) {
      await favoritesQuery({
        body: {
          movies: [{ ids: { trakt: id } }],
        },
      });

      await invalidate(InvalidateAction.Favorited(type));
    }

    isRating.set(false);
  };

  return {
    isRating,
    isFavorited,
    currentRating,
    addRating,
  };
}
