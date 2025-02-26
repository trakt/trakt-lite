import { z } from '../z.ts';
import { countryParamsSchema } from './countryParamsSchema.ts';

export const watchNowParamsSchema = z.object({
  id: z.string().or(z.number()),
}).merge(countryParamsSchema);
