import { authHeader } from '$lib/features/auth/stores/authHeader.ts';
import { api, type ApiParams } from '../../_internal/api.ts';
import { mapWatchNowResponseToWatchNowDetails } from '../../_internal/mapWatchNowResponseToWatchNowDetails.ts';
import type { WatchNowServices } from '../../models/WatchNowServices.ts';

type MovieWatchNowParams = {
  slug: string;
  country: string;
} & ApiParams;

function movieWatchNowRequest(
  { fetch, slug, country }: MovieWatchNowParams,
): Promise<WatchNowServices> {
  return api({ fetch })
    .movies
    .watchnow({
      params: {
        id: slug,
        country,
      },
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch watch now movie');
      }

      return mapWatchNowResponseToWatchNowDetails(body, country);
    });
}

const movieWatchNowQueryKey = (id: string, country: string) =>
  ['movieWatchNow', id, country] as const;
export const movieWatchNowQuery = (
  params: MovieWatchNowParams,
) => ({
  queryKey: movieWatchNowQueryKey(params.slug, params.country),
  queryFn: () => movieWatchNowRequest(params),
});
