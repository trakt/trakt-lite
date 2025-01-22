import type {
  FavoritedMoviesResponse,
  FavoritedShowsResponse,
} from '$lib/api.ts';
import { api, type ApiParams } from '$lib/requests/_internal/api';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';

export type FavoritedMedia = {
  favoritedAt: Date;
  id: number;
};

function mapFavoritedMovieResponse(
  entry: FavoritedMoviesResponse,
): FavoritedMedia {
  return {
    id: entry.movie.ids.trakt,
    favoritedAt: new Date(entry.listed_at),
  };
}

const favoritedMoviesRequest = (
  { fetch }: ApiParams,
): Promise<Map<number, FavoritedMedia>> =>
  api({ fetch })
    .users
    .favorites
    .movies({
      params: {
        id: 'me',
        sort: 'rank',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error('Error fetching user favorited movies', response);
        /**
         * TODO: define error handling strategy/system
         */
        throw new Error('Error fetching user favorited movies.');
      }

      return response.body;
    })
    .then((movies) =>
      movies
        .reduce((map, movie) => {
          const mapped = mapFavoritedMovieResponse(movie);
          map.set(mapped.id, mapped);
          return map;
        }, new Map<number, FavoritedMedia>())
    );

function mapFavoritedShowResponse(
  entry: FavoritedShowsResponse,
): FavoritedMedia {
  return {
    id: entry.show.ids.trakt,
    favoritedAt: new Date(entry.listed_at),
  };
}

const favoritedShowsRequest = (
  { fetch }: ApiParams,
): Promise<Map<number, FavoritedMedia>> =>
  api({ fetch })
    .users
    .favorites
    .shows({
      params: {
        id: 'me',
        sort: 'rank',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error('Error fetching user favorited episodes', response);
        /**
         * TODO: define error handling strategy/system
         */
        throw new Error('Error fetching user favorited episodes.');
      }

      return response.body;
    })
    .then((episodes) =>
      episodes
        .reduce((map, episode) => {
          const mapped = mapFavoritedShowResponse(episode);
          map.set(mapped.id, mapped);
          return map;
        }, new Map<number, FavoritedMedia>())
    );

export const currentUserFavoritesQueryKey = [
  'currentUserFavorites',
  InvalidateAction.Favorited('movie'),
  InvalidateAction.Favorited('show'),
] as const;
export const currentUserFavoritesQuery = ({ fetch }: ApiParams = {}) => ({
  queryKey: currentUserFavoritesQueryKey,
  queryFn: () => {
    return Promise.all([
      favoritedMoviesRequest({ fetch }),
      favoritedShowsRequest({ fetch }),
    ]).then((
      [movies, shows],
    ) => ({
      movies,
      shows,
    }));
  },
});
