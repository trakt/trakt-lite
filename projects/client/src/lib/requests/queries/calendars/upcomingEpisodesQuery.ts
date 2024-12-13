import type { ShowsResponse } from '$lib/api.ts';
import { authHeader } from '$lib/features/auth/stores/authHeader.ts';
import type { EpisodeEntry } from '$lib/models/EpisodeEntry.ts';
import {
  type EpisodeType,
  EpisodeUnknownType,
} from '$lib/models/EpisodeType.ts';
import type { ShowMeta } from '$lib/models/ShowMeta.ts';
import { findDefined } from '$lib/utils/string/findDefined.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { api, type ApiParams } from '../../_internal/api.ts';

export type CalendarShowsParams = {
  startDate: string;
  days: number;
} & ApiParams;

export type UpcomingEpisodeEntry = EpisodeEntry & {
  show: ShowMeta;
};

// TODO: normalize / dedupe episode media info
function mapResponseToEpisodeEntry(
  item: ShowsResponse[0],
): UpcomingEpisodeEntry {
  const posterCandidate = findDefined(
    item.episode.images?.screenshot.at(1),
    item.episode.images?.screenshot.at(0),
  )?.replace('/medium/', '/thumb/');

  const thumbCandidate = findDefined(
    item.show.images?.thumb.at(1),
    item.show.images?.thumb.at(0),
  );

  const showCoverCandidate = findDefined(
    item.show.images?.fanart.at(1),
    item.show.images?.fanart.at(0),
  )?.replace('/medium/', '/thumb/');

  return {
    id: item.episode.ids.trakt,
    show: {
      id: item.show.ids.trakt,
      slug: item.show.ids.slug,
      title: item.show.title,
      cover: {
        url: prependHttps(findDefined(
          thumbCandidate,
          showCoverCandidate,
        )),
      },
    },
    type: item.episode.episode_type as EpisodeType ??
      EpisodeUnknownType.Unknown,
    title: item.episode.title,
    season: item.episode.season,
    number: item.episode.number,
    poster: {
      url: prependHttps(posterCandidate),
    },
    airedDate: new Date(item.first_aired),
  };
}

function upcomingEpisodesRequest({
  startDate,
  days,
  fetch,
}: CalendarShowsParams): Promise<UpcomingEpisodeEntry[]> {
  return api({ fetch })
    .calendars
    .shows({
      query: {
        extended: 'full,cloud9',
      },
      params: {
        target: 'my',
        start_date: startDate,
        days,
      },
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then(({ status, body }) => {
      if (status !== 200) {
        throw new Error('Failed to fetch calendar');
      }

      return body
        .map(mapResponseToEpisodeEntry);
    });
}

export const upcomingEpisodeQueryKey = ['upcomingEpisodes'] as const;
export const upcomingEpisodesQuery = (params: CalendarShowsParams) => ({
  queryKey: upcomingEpisodeQueryKey,
  queryFn: () => upcomingEpisodesRequest(params),
});
