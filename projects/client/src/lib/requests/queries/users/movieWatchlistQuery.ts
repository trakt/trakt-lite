import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { extractPageMeta } from '$lib/requests/_internal/extractPageMeta.ts';
import { mapToMovieListItem } from '$lib/requests/_internal/mapToListItem.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import type { FilterParams } from '$lib/requests/models/FilterParams.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { ListItemSchemaFactory } from '$lib/requests/models/ListItem.ts';
import { PaginatableSchemaFactory } from '$lib/requests/models/Paginatable.ts';
import type { PaginationParams } from '$lib/requests/models/PaginationParams.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { SortType } from '@trakt/api';
import { z } from 'zod';
import { MovieEntrySchema } from '../../models/MovieEntry.ts';

type MovieWatchlistParams =
  & {
    sort: SortType;
  }
  & PaginationParams
  & ApiParams
  & FilterParams;

export const WatchlistMovieSchema = ListItemSchemaFactory(MovieEntrySchema);
export type WatchlistMovie = z.infer<typeof WatchlistMovieSchema>;

const watchlistRequest = (
  { fetch, sort, limit, page, filter }: MovieWatchlistParams,
) =>
  api({ fetch })
    .users
    .watchlist
    .movies({
      params: {
        id: 'me',
        sort,
      },
      query: {
        extended: 'full,images',
        page,
        limit,
        ...filter,
      },
    });

export const movieWatchlistQuery = defineQuery({
  key: 'movieWatchlist',
  invalidations: [
    InvalidateAction.Watchlisted('movie'),
    InvalidateAction.MarkAsWatched('movie'),
  ],
  dependencies: (
    params: MovieWatchlistParams,
  ) => [params.sort, params.limit, params.page, params.filter?.genres],
  request: watchlistRequest,
  mapper: (response) => ({
    entries: response.body.map(mapToMovieListItem),
    page: extractPageMeta(response.headers),
  }),
  schema: PaginatableSchemaFactory(WatchlistMovieSchema),
  ttl: time.hours(1),
});
