import { episodeResponseSchema } from '../../../_internal/response/episodeResponseSchema.ts';
import { z } from '../../../_internal/z.ts';

export const ratedEpisodesResponseSchema = z.object({
  rated_at: z.string(),
  rating: z.number().int().min(1).max(10),
  type: z.literal('episode'),
  episode: episodeResponseSchema,
});
