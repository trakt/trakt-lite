import type { StreamingServiceOptions } from '$lib/requests/models/StreamingServiceOptions.ts';

export const EpisodeSiloStreamingServiceOptionsMappedMock:
  StreamingServiceOptions = {
    'onDemand': [],
    'streaming': [
      {
        'is4k': true,
        'link': 'https://trakt.tv/watchnow/194270962',
        'webOSLink': undefined,
        'source': 'apple_tv_plus',
        'type': 'streaming',
      },
      {
        'is4k': true,
        'link': 'https://trakt.tv/watchnow/181597412',
        'webOSLink': undefined,
        'source': 'apple_tv_plus_amazon_channel',
        'type': 'streaming',
      },
    ],
  };
