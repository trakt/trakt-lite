import { builder } from '../_internal/builder.ts';
import { codeResponseSchema } from './_internal/response/codeResponseSchema.ts';
import { codeRequestSchema } from './_internal/request/codeRequestSchema.ts';
import { tokenResponseSchema } from './_internal/response/tokenResponseSchema.ts';
import { tokenRequestSchema } from './_internal/request/tokenRequestSchema.ts';
import { z } from '../_internal/z.ts';

const device = builder.router({
  code: {
    method: 'POST',
    path: '/code',
    body: codeRequestSchema,
    responses: {
      200: codeResponseSchema,
    },
  },
  token: {
    path: '/token',
    method: 'POST',
    body: tokenRequestSchema,
    responses: {
      200: tokenResponseSchema,
      400: z.undefined(),
    },
  },
}, {
  pathPrefix: '/device',
});

export type OAuthDeviceCodeRequest = z.infer<typeof codeRequestSchema>;
export type OAuthDeviceCodeResponse = z.infer<typeof codeResponseSchema>;
export type OAuthDeviceTokenRequest = z.infer<typeof tokenRequestSchema>;
export type OAuthDeviceTokenResponse = z.infer<typeof tokenResponseSchema>;

export const oauth = builder
  .router({
    device,
  }, {
    pathPrefix: '/oauth',
  });