import { z } from 'zod';
import { HttpsUrlSchema } from './HttpsUrlSchema.ts';

export const StreamingSourceSchema = z.object({
  source: z.string(),
  name: z.string(),
  isFree: z.boolean(),
  logoUrl: HttpsUrlSchema.nullish(),
});

export type StreamingSource = z.infer<
  typeof StreamingSourceSchema
>;
