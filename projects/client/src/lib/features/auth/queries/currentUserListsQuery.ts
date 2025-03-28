import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { toMap } from '$lib/utils/array/toMap.ts';
import { error } from '$lib/utils/console/print.ts';
import type { ListedMovieResponse, ListedShowResponse } from '@trakt/api';
import { z } from 'zod';
import { api, type ApiParams } from '../../../requests/api.ts';

type ListItemsParams = {
  listId: string;
} & ApiParams;

export const ListedMediaSchema = z.object({
  id: z.number(),
  listedAt: z.date(),
});
export type ListedEntry = z.infer<typeof ListedMediaSchema>;

const ListedMovieSchema = ListedMediaSchema;
export type ListedMovie = z.infer<typeof ListedMovieSchema>;

function mapListedMovieResponse(
  entry: ListedMovieResponse,
): ListedMovie {
  const { listed_at, movie } = entry;
  return {
    id: movie.ids.trakt,
    listedAt: new Date(listed_at),
  };
}

const currentUserListedMoviesRequest = ({ fetch, listId }: ListItemsParams) =>
  api({ fetch })
    .users
    .lists
    .list
    .items({
      params: {
        id: 'me',
        list_id: listId,
        type: 'movie',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        error('Error fetching user movie list items', response);
        throw new Error('Error fetching user movie list items.');
      }
      return response.body as ListedMovieResponse[];
    });

const ListedShowSchema = ListedMediaSchema;
export type ListedShow = z.infer<typeof ListedShowSchema>;

function mapListedShowResponse(
  entry: ListedShowResponse,
): ListedShow {
  const { listed_at, show } = entry;
  return {
    id: show.ids.trakt,
    listedAt: new Date(listed_at),
  };
}

const currentUserWatchlistedShowsRequest = (
  { fetch, listId }: ListItemsParams,
) =>
  api({ fetch })
    .users
    .lists
    .list
    .items({
      params: {
        id: 'me',
        list_id: listId,
        type: 'show',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        error('Error fetching user show list items', response);
        throw new Error('Error fetching user show list items.');
      }
      // TODO cast
      return response.body as ListedShowResponse[];
    });

const UserListSchema = z.map(
  z.string(),
  z.object({
    movies: z.map(z.number(), ListedMovieSchema),
    shows: z.map(z.number(), ListedShowSchema),
  }),
);
export type UserList = z.infer<typeof UserListSchema>;

const currentUserListsRequest = async ({ fetch }: ApiParams) => {
  const lists = await api({ fetch })
    .users
    .lists
    .personal({
      params: {
        id: 'me',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        error('Error fetching user personal lists.', response);
        throw new Error('Error fetching user personal lists.');
      }
      return response.body;
    });

  const listIds = lists.map((list) => list.ids.slug);

  // TODO fetch movies & shows in single query
  // TODO deal with delay
  const requests = listIds.flatMap((listId) => [
    currentUserListedMoviesRequest({ fetch, listId }),
    currentUserWatchlistedShowsRequest({ fetch, listId }),
  ]);
  const responses = await Promise.all(requests);

  // TODO move to mapper below
  const result = new Map();
  for (let i = 0; i < responses.length; i += 2) {
    const listId = listIds[i / 2];
    const movies = responses[i] as ListedMovieResponse[];
    const shows = responses[i + 1] as ListedShowResponse[];

    result.set(listId, {
      movies: toMap(movies, mapListedMovieResponse, (entry) => entry.id),
      shows: toMap(shows, mapListedShowResponse, (entry) => entry.id),
    });
  }

  return result;
};

export const currentUserListsQuery = defineQuery({
  key: 'currentUserLists',
  request: () => currentUserListsRequest({ fetch }),
  invalidations: [
    // TODO invalidators
    InvalidateAction.Watchlisted('show'),
    InvalidateAction.Watchlisted('movie'),
  ],
  dependencies: [],
  mapper: (data) => data,
  schema: UserListSchema,
  ttl: Infinity,
});
