import { movieResponseSchema } from '../../../_internal/response/movieResponseSchema.ts';
import { z } from '../../../_internal/z.ts';

export const favoritedShowsResponseSchema = z.object({
  id: z.number(),
  listed_at: z.string(),
  notes: z.string(),
  type: z.literal('show'),
  show: movieResponseSchema,
});
