import { HttpsUrlSchema } from '$lib/requests/models/HttpsUrlSchema.ts';
import { z } from 'zod';

export const MediaRatingSchema = z.object({
  trakt: z.object({
    rating: z.number(),
    votes: z.number(),
    distribution: z.record(
      z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
      z.number(),
    ),
  }),
  tmdb: z.object({
    rating: z.number(),
    votes: z.number(),
    url: HttpsUrlSchema.nullish(),
  }),
  rotten: z.object({
    critic: z.number(),
    audience: z.number(),
    url: HttpsUrlSchema.nullish(),
  }),
  imdb: z.object({
    rating: z.number(),
    votes: z.number(),
    url: HttpsUrlSchema.nullish(),
  }),
  metacritic: z.object({
    rating: z.number(),
    url: HttpsUrlSchema.nullish(),
  }),
});

export type MediaRating = z.infer<typeof MediaRatingSchema>;
