import { z } from '../../../_internal/z.ts';

export const showListResponseSchema = z.array(
  z.object({
    first_aired: z.string(),
    episode: z.object({
      season: z.number(),
      number: z.number(),
      title: z.string(),
      ids: z.object({
        trakt: z.number(),
        tvdb: z.number(),
        imdb: z.string(),
        tmdb: z.number(),
      }),
    }),
    show: z.object({
      title: z.string(),
      year: z.number(),
      ids: z.object({
        trakt: z.number(),
        slug: z.string(),
        tvdb: z.number(),
        imdb: z.string(),
        tmdb: z.number(),
      }),
    }),
  }),
);
