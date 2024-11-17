import {
  type EpisodeType,
  EpisodeUnknownType,
} from '$lib/models/EpisodeType.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { api } from '../_internal/api.ts';
import { authHeader } from '../_internal/authHeader.ts';

export type CalendarShowsParams = {
  startDate: string;
  days: number;
};

export type EpisodeEntry = {
  id: number;
  season: number;
  number: number;
  title: string;
  show: {
    id: number;
    title: string;
  };
  poster: {
    url: string;
  };
  airedDate: Date;
  type: EpisodeType;
};

export function upcomingEpisodes({
  startDate,
  days,
}: CalendarShowsParams): Promise<EpisodeEntry[]> {
  return api.calendars
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
        .map((item) => {
          const posterCandidate = item.episode.images!.screenshot.at(1) ??
            item.episode.images!.screenshot.at(0) ??
            item.show.images!.fanart.at(1) ??
            item.show.images!.fanart.at(0);

          return {
            id: item.episode.ids.trakt,
            show: {
              id: item.show.ids.trakt,
              title: item.show.title,
            },
            type: item.episode.episode_type as EpisodeType ??
              EpisodeUnknownType.Unknown,
            title: item.episode.title,
            season: item.episode.season,
            number: item.episode.number,
            poster: {
              url: prependHttps(posterCandidate)!,
            },
            airedDate: new Date(item.first_aired),
          };
        });
    });
}
