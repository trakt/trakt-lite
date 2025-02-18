import { genreOptionSchema } from '@trakt/api';
import { z } from 'zod';
import { HttpsUrlSchema } from './HttpsUrlSchema.ts';
import { MediaStatusSchema } from './MediaStatus.ts';
import { MediaTypeSchema } from './MediaType.ts';

const ImageUrlsSchema = z.object({
  medium: HttpsUrlSchema,
  thumb: HttpsUrlSchema,
});

export const MediaEntrySchema = z.object({
  id: z.number(),
  slug: z.string(),
  type: MediaTypeSchema,
  year: z.number().nullish(),
  runtime: z.number(),
  title: z.string(),
  tagline: z.string(),
  country: z.string().nullish(),
  languages: z.array(z.string()).nullish(),
  poster: z.object({
    url: ImageUrlsSchema,
  }),
  cover: z.object({
    url: ImageUrlsSchema,
  }),
  thumb: z.object({
    url: HttpsUrlSchema,
  }),
  genres: genreOptionSchema.array(),
  status: MediaStatusSchema,
  overview: z.string(),
  trailer: z.string(),
  airDate: z.date(),
  certification: z.string().optional(),
  votes: z.number(),
});

export type MediaEntry = z.infer<typeof MediaEntrySchema>;
