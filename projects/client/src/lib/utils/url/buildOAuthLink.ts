import { browser } from '$app/environment';
import { Environment } from '$lib/api.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';

export type BuildOAuthUrlParams = {
  local: Environment;
  target: Environment;
};

export function buildOAuthUrl() {
  if (!browser) {
    return '';
  }

  const env = prependHttps(
    TRAKT_TARGET_ENVIRONMENT
      .replace('api.', '')
      .replace('apiz.', ''),
  );

  return `${env}/oauth/authorize?client_id=${TRAKT_CLIENT_ID}&redirect_uri=${location.origin}&response_type=code`;
}