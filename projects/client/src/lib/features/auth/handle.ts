import { requestDeviceCode } from '$lib/features/auth/requests/requestDeviceCode.ts';
import { IS_DEV } from '$lib/utils/env/index.ts';
import { time } from '$lib/utils/timing/time.ts';
import { buildOAuthUrl } from '$lib/utils/url/buildOAuthLink.ts';
import { setCacheBuster } from '$lib/utils/url/setCacheBuster.ts';
import { type Handle, type RequestEvent } from '@sveltejs/kit';
import { AuthDeviceEndpoint } from './AuthDeviceEndpoint.ts';
import { AuthEndpoint } from './AuthEndpoint.ts';
import type {
  SerializedAuthResponse,
} from './models/SerializedAuthResponse.ts';
import { authorize, UNAUTHORIZED_PAYLOAD } from './requests/authorize.ts';
import { authorizeDeviceCode } from './requests/authorizeDeviceCode.ts';

export const AUTH_COOKIE_NAME = 'trakt-auth';
const REFRESH_THRESHOLD_MINUTES = 15;

function getAuth(event: RequestEvent): SerializedAuthResponse | null {
  try {
    const serializedToken = event.cookies.get(AUTH_COOKIE_NAME) ?? '';
    return JSON.parse(serializedToken) as SerializedAuthResponse;
  } catch (_) {
    return null;
  }
}

function isContentRequest(event: RequestEvent) {
  const acceptHeader = event.request.headers.get('accept');
  return acceptHeader?.includes('text/html');
}

function isAuthEndpointRequest(event: RequestEvent) {
  const authPaths = [
    ...Object.values(AuthDeviceEndpoint),
    ...Object.values(AuthEndpoint),
  ];

  return authPaths.some((path) => event.url.pathname.startsWith(path));
}

// FIXME: split up this file
export const handle: Handle = async ({ event, resolve }) => {
  if (!isContentRequest(event) && !isAuthEndpointRequest(event)) {
    return await resolve(event);
  }

  const setAuth = (auth: SerializedAuthResponse | Nil) => {
    event.locals.auth = auth;
  };

  /** FIXME: extract this instead of having it hardcoded */
  const getReferrer = () =>
    IS_DEV ? 'http://localhost:5173' : 'https://app.trakt.tv';

  const authorizedResponse = (response: SerializedAuthResponse, url: URL) => {
    const { isAuthorized } = response;
    setAuth(response);

    const headers = new Headers();

    if (isAuthorized) {
      const cookie = event.cookies.serialize(
        AUTH_COOKIE_NAME,
        JSON.stringify(response),
        {
          httpOnly: true,
          secure: true,
          maxAge: time.years(1) / time.seconds(1),
          path: '/',
        },
      );

      headers.set('Set-Cookie', cookie);
    }

    return new Response(null, {
      status: 302,
      headers: {
        ...Object.fromEntries(headers),
        Location: setCacheBuster(url).toString(),
      },
    });
  };

  const isLogout = event.url.pathname.startsWith(AuthEndpoint.Logout);

  if (isLogout) {
    setAuth(null);
    return new Response(null, {
      headers: {
        'Set-Cookie': event.cookies.serialize(AUTH_COOKIE_NAME, '', {
          httpOnly: true,
          secure: true,
          maxAge: 0,
          path: '/',
        }),
      },
    });
  }

  const isDeviceAuth = event.url.pathname.startsWith(AuthDeviceEndpoint.Get);

  if (isDeviceAuth) {
    const response = await requestDeviceCode();

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const isDeviceAuthPoll = event.url.pathname.startsWith(
    AuthDeviceEndpoint.Poll,
  );

  if (isDeviceAuthPoll) {
    const { code } = await event.request.json() as { code: string };
    const response = await authorizeDeviceCode(code);

    if ('state' in response) {
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return authorizedResponse(response, new URL(event.url.origin));
  }

  const code = event.url.searchParams.get('code');
  const isExchange = code != null;

  if (isExchange) {
    const result = await authorize({
      token: {
        type: 'exchange',
        code,
      },
      referrer: getReferrer(),
    });

    const url = new URL(event.url);
    url.searchParams.delete('code');
    return authorizedResponse(result, url);
  }

  const authResponse = getAuth(event);

  const minutesToExpiry = Math.floor(
    (new Date(authResponse?.expiresAt ?? 0).getTime() - Date.now()) /
      time.minutes(1),
  );
  const shouldRefresh = minutesToExpiry <= REFRESH_THRESHOLD_MINUTES;

  if (shouldRefresh && authResponse?.token.refresh != null) {
    const result = await authorize({
      token: {
        type: 'refresh',
        refreshToken: authResponse.token.refresh,
      },
      referrer: getReferrer(),
    });

    if (result === UNAUTHORIZED_PAYLOAD) {
      const url = buildOAuthUrl(TRAKT_CLIENT_ID, getReferrer());

      setAuth(null);
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.toString(),
          'Set-Cookie': event.cookies.serialize(AUTH_COOKIE_NAME, '', {
            httpOnly: true,
            secure: true,
            maxAge: 0,
            path: '/',
          }),
        },
      });
    }

    setAuth(result);
    event.cookies.set(
      AUTH_COOKIE_NAME,
      JSON.stringify(result),
      {
        httpOnly: true,
        secure: true,
        maxAge: time.years(1) / time.seconds(1),
        path: '/',
      },
    );

    return await resolve(event);
  }

  setAuth(authResponse);

  if (!authResponse) {
    event.cookies.set(AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      path: '/',
    });

    return await resolve(event);
  }

  return await resolve(event);
};
