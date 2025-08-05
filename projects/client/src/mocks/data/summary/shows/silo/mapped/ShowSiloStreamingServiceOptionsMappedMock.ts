import type { StreamingServiceOptions } from '$lib/requests/models/StreamingServiceOptions.ts';

export const ShowSiloStreamingServiceOptionsMappedMock:
  StreamingServiceOptions = {
    'onDemand': [],
    'streaming': [
      {
        'is4k': true,
        'link': 'https://trakt.tv/watchnow/194269876',
        'webOSLink': undefined,
        'source': 'apple_tv_plus',
        'type': 'streaming',
      },
      {
        'is4k': true,
        'link': 'https://trakt.tv/watchnow/181342180',
        'webOSLink': undefined,
        'source': 'apple_tv_plus_amazon_channel',
        'type': 'streaming',
      },
    ],
  };
