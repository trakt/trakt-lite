import { handle as handleAuth } from '$lib/features/auth/handle.ts';
import { handle as handleCacheBust } from '$lib/features/cache-bust/handle.ts';
import { handle as handleCookieConsent } from '$lib/features/cookie-consent/handle.ts';
import { handle as handleDeployment } from '$lib/features/deployment/handle.ts';
import { handle as handleDevice } from '$lib/features/devices/handle.ts';
import { handle as handleLocale } from '$lib/features/i18n/handle.ts';
import { handle as handleImage } from '$lib/features/image/handle.ts';
import { handle as handleMobileOperatingSystem } from '$lib/features/mobile-os/handle.ts';
import { handle as handleTheme } from '$lib/features/theme/handle.ts';

import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const CHROME_DEV_TOOLS_PATH =
  '/.well-known/appspecific/com.chrome.devtools.json';

const WHITELISTED_HEADERS = new Set([
  'content-type',
  'x-pagination-page',
  'x-pagination-page-count',
]);

const handleChromeDevTools: Handle = async ({ event, resolve }) => {
  return event.url.pathname.startsWith(CHROME_DEV_TOOLS_PATH)
    ? new Response(null, { status: 204 })
    : await resolve(event);
};

export const handleCacheControl: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (response.headers.get('content-type')?.includes('text/html')) {
    const clonedHeaders = new Headers(response.headers);

    clonedHeaders.set(
      'Cache-Control',
      'private, no-store, no-cache, must-revalidate',
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: clonedHeaders,
    });
  }

  return response;
};

export const handle: Handle = sequence(
  handleDevice,
  handleLocale,
  handleTheme,
  handleAuth,
  handleImage,
  handleCacheBust,
  ({ event, resolve }) => {
    return resolve(event, {
      filterSerializedResponseHeaders: (name) => WHITELISTED_HEADERS.has(name),
    });
  },
  handleCacheControl,
  handleMobileOperatingSystem,
  handleDeployment,
  handleCookieConsent,
  handleChromeDevTools,
);
