import { type ShowResponse } from '$lib/api.ts';
import type { ShowSummary } from '$lib/requests/models/ShowSummary.ts';
import {
  DEFAULT_TRAILER,
  MAX_DATE,
  MEDIA_COVER_THUMB_PLACEHOLDER,
} from '$lib/utils/constants.ts';
import { findDefined } from '$lib/utils/string/findDefined.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { mapCover } from './mapCover.ts';
import { mapPoster } from './mapPoster.ts';

export function mapShowResponseToShowSummary(
  show: ShowResponse,
): ShowSummary {
  const poster = mapPoster(show.images);
  const cover = mapCover(show.images);

  const thumbCandidate = findDefined(
    show.images?.thumb.at(1),
    show.images?.thumb.at(0),
  );

  return {
    id: show.ids.trakt,
    slug: show.ids.slug,
    title: show.title,
    runtime: show.runtime ?? NaN,
    year: show.year,
    tagline: show.tagline ?? '',
    country: show.country,
    languages: show.languages,
    poster,
    cover,
    thumb: {
      url: prependHttps(
        findDefined(
          thumbCandidate,
          cover.url.thumb,
        ),
        MEDIA_COVER_THUMB_PLACEHOLDER,
      ),
    },
    genres: show.genres ?? [],
    status: show.status ?? 'unknown',
    overview: show.overview ?? 'TBD',
    trailer: prependHttps(
      show.trailer,
      DEFAULT_TRAILER,
    ),
    airedDate: new Date(show.first_aired ?? MAX_DATE),
    certification: show.certification,
  };
}
