import { createAuthenticatedFetch } from '$lib/requests/_internal/createAuthenticatedFetch.ts';
import { ClientEnvironment } from '$lib/requests/ClientEnvironment.ts';
import { IS_DEV, IS_PREVIEW, IS_TEST } from '$lib/utils/env/index.ts';
import { traktApi, type TraktApiOptions } from '@trakt/api';

export type ApiParams = Omit<TraktApiOptions, 'apiKey' | 'environment'> & {
  environment?: HttpsUrl;
};

const ENV = (() => {
  if (IS_DEV || IS_PREVIEW) {
    return ClientEnvironment.development as unknown as HttpsUrl;
  }

  if (IS_TEST) {
    return ClientEnvironment.test as unknown as HttpsUrl;
  }

  return TRAKT_TARGET_ENVIRONMENT as unknown as HttpsUrl;
})();

export const api = ({
  environment = ENV,
  fetch = globalThis.fetch,
  cancellable = false,
  cancellationId,
}: ApiParams = {}) =>
  traktApi({
    apiKey: TRAKT_CLIENT_ID,
    environment,
    fetch: createAuthenticatedFetch(fetch),
    cancellable,
    cancellationId,
  });
