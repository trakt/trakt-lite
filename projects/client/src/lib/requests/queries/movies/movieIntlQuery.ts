import type {
  AvailableLanguage,
  AvailableRegion,
} from '$lib/features/i18n/index.ts';
import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { TranslationResponse } from '@trakt/api';
import { type MediaIntl, MediaIntlSchema } from '../../models/MediaIntl.ts';

type MovieIntlParams = {
  slug: string;
  language: AvailableLanguage;
  region: AvailableRegion;
} & ApiParams;

function mapMovieIntlResponse(
  translation?: TranslationResponse[0],
): MediaIntl | undefined {
  if (!translation) {
    return undefined;
  }

  return {
    ...translation,
  };
}

const movieIntlRequest = (
  { fetch, slug, language }: MovieIntlParams,
) =>
  api({ fetch })
    .movies
    .translations({
      params: {
        id: slug,
        language,
      },
    });

export const movieIntlQuery = defineQuery({
  key: 'movieIntl',
  invalidations: [],
  dependencies: (params) => [
    params.slug,
    params.language,
    params.region,
  ],
  request: movieIntlRequest,
  mapper: (response, { language, region }) =>
    response.body
      .filter((translation) =>
        translation.language === language &&
        translation.country === region
      )
      .map(mapMovieIntlResponse)
      .at(0),
  schema: MediaIntlSchema.optional(),
  ttl: time.days(7),
});
