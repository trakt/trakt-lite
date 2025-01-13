import { builder } from '../_internal/builder.ts';
import type { z } from '../_internal/z.ts';
import { watchNowCountryParamsSchema } from './_internal/request/watchNowCountryParamsSchema.ts';
import { watchNowSourcesResponseSchema } from './_internal/response/watchNowSourcesResponseSchema.ts';

export const watchnow = builder.router({
  sources: {
    path: '/sources/:country',
    pathParams: watchNowCountryParamsSchema,
    method: 'GET',
    responses: {
      200: watchNowSourcesResponseSchema.array(),
    },
  },
}, {
  pathPrefix: '/watchnow',
});

export type WatchNowSourcesResponse = z.infer<
  typeof watchNowSourcesResponseSchema
>;
