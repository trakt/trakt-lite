import type {
  AvailableLanguage,
  AvailableRegion,
} from '$lib/features/i18n/index.ts';
import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { time } from '$lib/utils/timing/time.ts';
import type { EpisodeTranslationResponse } from '@trakt/api';
import {
  type EpisodeIntl,
  EpisodeIntlSchema,
} from '../../models/EpisodeIntl.ts';

type EpisodeIntlParams = {
  slug: string;
  season: number;
  episode: number;
  language: AvailableLanguage;
  region: AvailableRegion;
} & ApiParams;

function mapEpisodeIntlResponse(
  translation?: EpisodeTranslationResponse[0],
): EpisodeIntl | undefined {
  if (!translation) {
    return undefined;
  }

  return {
    title: translation.title,
    overview: translation.overview,
  };
}

const episodeIntlRequest = (
  { fetch, slug, language, season, episode }: EpisodeIntlParams,
) =>
  api({ fetch })
    .shows
    .episode
    .translations({
      params: {
        id: slug,
        season,
        episode,
        language,
      },
    });

export const episodeIntlQuery = defineQuery({
  key: 'episodeIntl',
  invalidations: [],
  dependencies: (params) => [
    params.slug,
    params.season,
    params.episode,
    params.language,
    params.region,
  ],
  request: episodeIntlRequest,
  mapper: (response, { language, region }) =>
    response.body
      .filter((translation) =>
        translation.language === language &&
        translation.country === region
      )
      .map(mapEpisodeIntlResponse)
      .at(0),
  schema: EpisodeIntlSchema.optional(),
  ttl: time.days(7),
});
