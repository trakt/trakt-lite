import { z } from '../../../_internal/z.ts';

export const tokenRequestSchema = z.object({
  code: z.string({
    description:
      'The code received when trakt redirects the user back to the application.',
  }),
  client_id: z.string({
    description: `The client ID of the application. 
            You can find it in the application details here: https://trakt.tv/oauth/applications`,
  }),
  client_secret: z.string({
    description: `The client secret of the application. 
            You can find it in the application details here: https://trakt.tv/oauth/applications`,
  }),
  redirect_uri: z.string({
    description: 'URI specified in your app settings.',
  }),
  grant_type: z.literal('authorization_code'),
});
