import { z } from '../../../_internal/z.ts';

export const watchNowCountryParamsSchema = z.object({
  country: z.string(),
});
