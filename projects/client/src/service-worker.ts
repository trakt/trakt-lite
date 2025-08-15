import { AssetPattern } from '$worker/AssetPattern.ts';
import { Domain } from '$worker/Domain.ts';
import { WorkerMessage } from '$worker/WorkerMessage.ts';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { time } from './lib/utils/timing/time.ts';
import { CacheKey } from './worker/CacheKey.ts';

declare global {
  interface ServiceWorkerGlobalScope {
    __WB_DISABLE_DEV_LOGS: boolean;
  }
}

declare let self: ServiceWorkerGlobalScope;

/**
 * Disable workbox logs in development.
 * @see https://developer.chrome.com/docs/workbox/troubleshooting-and-logging#workbox_logging
 */
self.__WB_DISABLE_DEV_LOGS = true;

function removeNavigationCache() {
  caches.delete(CacheKey.navigation);
}

addEventListener('message', (event) => {
  if (event.data?.type === WorkerMessage.CacheBust) {
    removeNavigationCache();
  }
});

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Navigation routes
const navigationHandler = new StaleWhileRevalidate({
  cacheName: CacheKey.navigation,
});

registerRoute(
  new NavigationRoute(async (context) => {
    const url = new URL(context.request.url);
    const hasCacheParam = url.searchParams.has('_cb');

    if (hasCacheParam) {
      // Delete the entire navigation cache
      await removeNavigationCache();

      // Remove _cb param and redirect
      url.searchParams.delete('_cb');
      return Response.redirect(url.toString(), 302);
    }

    try {
      const response = await navigationHandler.handle(context);

      // If we got a valid response, check if we're offline
      if (response) {
        // Try a quick network check to see if we're truly offline
        try {
          await fetch(new URL('/', url.origin), {
            method: 'HEAD',
            cache: 'no-cache',
            signal: AbortSignal.timeout(1000), // 1 second timeout
          });
          // Network is available, return the cached response as-is
          return response;
        } catch (networkError) {
          // Network is unavailable, we're offline
          console.log(
            'Network check failed, we appear to be offline:',
            networkError,
          );

          // If we're not already on the offline URL, redirect with offline param
          if (!url.searchParams.has('offline')) {
            const offlineUrl = new URL(url.href);
            offlineUrl.searchParams.set('offline', 'true');
            return Response.redirect(offlineUrl.toString(), 302);
          }

          // Return the cached response since we're already on the offline URL
          return response;
        }
      }

      // If navigationHandler succeeded but returned falsy response,
      // we're likely offline or the cache is empty
      console.log(
        'Navigation handler returned falsy response, treating as offline',
      );
    } catch (error) {
      // Network failed, we're offline
      console.log(
        'Network request failed, redirecting to offline mode:',
        error,
      );
    }
  }),
);

// Manifest route - always try network first
registerRoute(
  ({ url }) => url.pathname.endsWith('manifest.webmanifest'),
  new NetworkFirst({
    cacheName: CacheKey.manifest,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: time.hours(1) / time.seconds(1),
      }),
    ],
  }),
);

// Static assets with auth-aware cache
registerRoute(
  ({ url }) => {
    // Skip caching for localhost
    // if (url.hostname === 'localhost') {
    //   return false;
    // }
    return AssetPattern.static.test(url.pathname) ||
      AssetPattern.media.test(url.pathname) ||
      AssetPattern.documents.test(url.pathname);
  },
  new CacheFirst({
    cacheName: CacheKey.static,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: time.days(30) / time.seconds(1),
      }),
    ],
  }),
);

// External resources
const externalRouteHandler = new StaleWhileRevalidate({
  cacheName: CacheKey.external,
  plugins: [
    new ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: time.days(7) / time.seconds(1),
    }),
  ],
});

// Fonts
registerRoute(
  ({ url }) => Domain.fonts.includes(url.hostname),
  externalRouteHandler,
);

// Styles
registerRoute(
  ({ url }) => Domain.styles.includes(url.hostname),
  externalRouteHandler,
);

// Images
registerRoute(
  ({ url }) => Domain.images.includes(url.hostname),
  new CacheFirst({
    cacheName: CacheKey.images,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 666,
        maxAgeSeconds: time.days(30) / time.seconds(1),
      }),
    ],
  }),
);
