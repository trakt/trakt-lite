import { z } from '../../../_internal/z.ts';

const watchNowSourceResponseSchema = z.object({
  source: z.string(),
  name: z.string(),
  free: z.boolean(),
  cinema: z.boolean(),
  color: z.string(),
  images: z.object({
    logo: z.string(),
  }),
});

export const watchNowSourcesResponseSchema = z.record(
  z.string(),
  z.array(watchNowSourceResponseSchema),
);
