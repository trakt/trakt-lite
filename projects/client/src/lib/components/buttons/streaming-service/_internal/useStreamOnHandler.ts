import type { StreamNow } from '$lib/requests/models/StreamingServiceOptions.ts';

type StreamOnHandler = {
  href: HttpsUrl;
} | {
  onclick: () => void;
};

export function useStreamOnHandler(service: StreamNow): StreamOnHandler {
  return {
    onclick: () => {
      console.log('useStreamOnHandler', service);
      webOS.service.request('luna://com.webos.applicationManager', {
        method: 'launch',
        parameters: {
          id: service.webosLink?.id,
          params: {
            contentTarget: service.webosLink?.contentTarget,
          },
        },
        onSuccess: (res) => console.log('Firmware:', res),
        onFailure: (err) => console.error('Error:', err),
      });
    },
  };
  // const deepLinkHandler = getDeepLinkHandler();
  // if (!deepLinkHandler || !service.deepLink) {
  //   return {
  //     href: service.link,
  //   };
  // }

  // const { sources } = useStreamingServices();
  // const source = derived(
  //   sources,
  //   ($sources) => $sources.find((s) => s.source === service.source),
  // );

  // const handler = () => {
  //   const sourceName = get(source)?.name ?? service.source;

  //   deepLinkHandler.open(
  //     sourceName,
  //     assertDefined(service.deepLink, 'Deep link is required'),
  //   );
  // };

  // return {
  //   onclick: handler,
  // };
}
