import type { WatchNowSourcesResponse } from '$lib/api.ts';
import type { WatchNowSource } from '$lib/requests/models/WatchNowSources.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { api, type ApiParams } from '../../_internal/api.ts';

type WatchNowSourcesParams = {
  country: string;
} & ApiParams;

function mapWatchNowSourcesResponse(
  sourcesResponse: WatchNowSourcesResponse,
  country: string,
): WatchNowSource[] {
  if (!sourcesResponse) {
    return [];
  }

  const watchNowSources = sourcesResponse[country];
  return watchNowSources.map((watchNowSource) => ({
    source: watchNowSource.source,
    name: watchNowSource.name,
    isFree: watchNowSource.free,
    logoUrl: prependHttps(watchNowSource.images.logo),
  }));
}

function watchNowSourcesRequest(
  { fetch, country }: WatchNowSourcesParams,
): Promise<WatchNowSource[]> {
  return api({ fetch })
    .watchnow
    .sources({
      params: {
        country,
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch watch now sources');
      }

      return body
        .flatMap((response) => mapWatchNowSourcesResponse(response, country));
    });
}

const watchNowSourcesQueryKey = (country: string) =>
  ['watchNowSources', country] as const;
export const watchNowSourcesQuery = (
  params: WatchNowSourcesParams,
) => ({
  queryKey: watchNowSourcesQueryKey(params.country),
  queryFn: () => watchNowSourcesRequest(params),
});
