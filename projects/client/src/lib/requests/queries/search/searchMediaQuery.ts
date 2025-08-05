import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { mapToMovieEntry } from '$lib/requests/_internal/mapToMovieEntry.ts';
import { mapToShowEntry } from '$lib/requests/_internal/mapToShowEntry.ts';

import { api, type ApiParams } from '$lib/requests/api.ts';
import { MediaEntrySchema } from '$lib/requests/models/MediaEntry.ts';
import { DEFAULT_SEARCH_LIMIT } from '$lib/utils/constants.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { SearchResultResponse } from '@trakt/api';
import z from 'zod';
import type { MediaEntry } from '../../models/MediaEntry.ts';
import type { MediaType } from '../../models/MediaType.ts';
import { EXPERIMENTAL_PARAMS } from './_internal/constants.ts';
import { searchCancellationId } from './searchCancellationId.ts';

type SearchParams = {
  query: string;
} & ApiParams;

const MediaSearchResultSchema = z.object({
  type: z.literal('media'),
  items: z.object({
    movies: MediaEntrySchema.array(),
    shows: MediaEntrySchema.array(),
  }),
});

export type MediaSearchResult = z.infer<typeof MediaSearchResultSchema>;

function isGarbage(value: MediaEntry): boolean {
  const isReleased = value?.status === 'released';
  const isInvalidRelease = isReleased && value?.year == null;
  const hasNoGenres = !value?.genres.length;

  return isInvalidRelease ||
    hasNoGenres;
}

function mapToSearchResultEntry(
  item: SearchResultResponse[0],
): MediaEntry {
  const { type } = item;
  switch (type) {
    case 'show':
      return mapToShowEntry(item.show);
    case 'movie':
      return mapToMovieEntry(item.movie);
    default:
      throw new Error(`Unsupported type for media search: ${type}`);
  }
}

const searchRequest = ({ query, fetch }: SearchParams, type: MediaType) =>
  api({
    fetch,
    cancellable: true,
    cancellationId: searchCancellationId(type),
  })
    .search
    .query({
      query: {
        query,
        extended: 'full,images',
        limit: DEFAULT_SEARCH_LIMIT,
        ...EXPERIMENTAL_PARAMS,
      },
      params: {
        type,
      },
    });

function searchRequests({ query, fetch }: SearchParams) {
  return Promise.all([
    searchRequest({ fetch, query }, 'movie'),
    searchRequest({ fetch, query }, 'show'),
  ]);
}

export const searchMediaQuery = defineQuery({
  key: 'searchMedia',
  invalidations: [],
  dependencies: (params) => [params.query.toLowerCase().trim()],
  request: searchRequests,
  mapper: ([moviesResponse, showsResponse]) => {
    return {
      type: 'media' as const,
      items: {
        movies: moviesResponse.body
          .map(mapToSearchResultEntry)
          .filter((value) => !isGarbage(value)),
        shows: showsResponse.body
          .map(mapToSearchResultEntry)
          .filter((value) => !isGarbage(value)),
      },
    };
  },
  schema: MediaSearchResultSchema,
  ttl: time.minutes(30),
  retry: 0,
});
