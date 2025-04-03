import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { extractPageMeta } from '$lib/requests/_internal/extractPageMeta.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { PaginatableSchemaFactory } from '$lib/requests/models/Paginatable.ts';
import type { PaginationParams } from '$lib/requests/models/PaginationParams.ts';
import { time } from '$lib/utils/timing/time.ts';
import { mapToMovieEntry } from '../../_internal/mapToMovieEntry.ts';
import { MovieEntrySchema } from '../../models/MovieEntry.ts';

type MoviePopularParams = PaginationParams & ApiParams;

const moviePopularRequest = (
  { fetch, limit, page }: MoviePopularParams,
) =>
  api({ fetch })
    .movies
    .popular({
      query: {
        extended: 'full,images',
        ignore_collected: true,
        ignore_watchlisted: true,
        ignore_watched: true,
        page,
        limit,
      },
    });

export const moviePopularQuery = defineQuery({
  key: 'moviePopular',
  invalidations: [
    InvalidateAction.Watchlisted('movie'),
    InvalidateAction.MarkAsWatched('movie'),
  ],
  dependencies: (params) => [params.limit, params.page],
  request: moviePopularRequest,
  mapper: (response) => ({
    entries: response.body.map(mapToMovieEntry),
    page: extractPageMeta(response.headers),
  }),
  schema: PaginatableSchemaFactory(MovieEntrySchema),
  ttl: time.hours(1),
});
