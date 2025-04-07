import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { extractPageMeta } from '$lib/requests/_internal/extractPageMeta.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { PaginatableSchemaFactory } from '$lib/requests/models/Paginatable.ts';
import type { PaginationParams } from '$lib/requests/models/PaginationParams.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { MovieStreamingResponse } from '@trakt/api';
import { z } from 'zod';
import { mapToMovieEntry } from '../../_internal/mapToMovieEntry.ts';
import { MovieEntrySchema } from '../../models/MovieEntry.ts';

export const StreamingMovieSchema = MovieEntrySchema.extend({
  rank: z.number(),
  delta: z.number(),
});
export type StreamingMovie = z.infer<typeof StreamingMovieSchema>;

type MovieStreamingParams = PaginationParams & ApiParams;

function mapToStreamingMovie({
  rank,
  delta,
  movie,
}: MovieStreamingResponse): StreamingMovie {
  return {
    rank,
    delta: delta ?? 0,
    ...mapToMovieEntry(movie),
  };
}

const movieStreamingRequest = (
  { fetch, limit, page }: MovieStreamingParams,
) =>
  api({ fetch })
    .movies
    .streaming({
      params: {
        period: 'daily',
      },
      query: {
        extended: 'full,images',
        watchnow: 'favorites',
        ignore_collected: true,
        ignore_watchlisted: true,
        ignore_watched: true,
        page,
        limit,
      },
    });

export const movieStreamingQuery = defineQuery({
  key: 'movieStreaming',
  invalidations: [
    InvalidateAction.Watchlisted('movie'),
    InvalidateAction.MarkAsWatched('movie'),
  ],
  dependencies: (params) => [params.limit, params.page],
  request: movieStreamingRequest,
  mapper: (response) => ({
    entries: response.body.map(mapToStreamingMovie),
    page: extractPageMeta(response.headers),
  }),
  schema: PaginatableSchemaFactory(StreamingMovieSchema),
  ttl: time.hours(1),
});
