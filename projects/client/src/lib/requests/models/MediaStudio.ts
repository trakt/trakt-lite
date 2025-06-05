import { z } from 'zod';

export const MediaStudioSchema = z.object({
  name: z.string(),
  country: z.string().nullish(),
  ids: z.object({
    slug: z.string(),
  }),
});
export type MediaStudio = z.infer<typeof MediaStudioSchema>;
