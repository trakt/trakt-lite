import type { MediaType } from '$lib/requests/models/MediaType.ts';
import type { SearchParams } from '../../requests/models/SearchParams.ts';
import { buildParamString } from './buildParamString.ts';

type TypeParams = {
  type: MediaType | 'episode';
};

type WellKnownQueryParams = {
  page?: number;
  watch_window?: number;
  status?: string;
  search?: string;
};

type UrlBuilderParams =
  & TypeParams
  & Omit<WellKnownQueryParams, 'search'>
  & SearchParams;

function encodeRecord(
  params?: Record<string, string | number | boolean>,
): string | undefined {
  if (!params) {
    return undefined;
  }

  return encodeURIComponent(JSON.stringify(params));
}

export function decodeRecord(
  params: string,
): Record<string, string | number | boolean> {
  try {
    return JSON.parse(decodeURIComponent(params));
  } catch (_) {
    return {};
  }
}

function sanitizeParams(
  params: Omit<WellKnownQueryParams, 'search'> & SearchParams,
): WellKnownQueryParams {
  return {
    page: params.page,
    watch_window: params.watch_window,
    status: params.status,
    search: encodeRecord(params.search),
  };
}

const mediaDrilldownFactory =
  (category: string) => ({ type, ...params }: UrlBuilderParams) => {
    const baseUrl = `/${type}s/${category}`;
    return baseUrl + buildParamString({
      ...sanitizeParams(params),
    });
  };

const categoryDrilldownFactory =
  (category: string) => ({ type, ...params }: UrlBuilderParams) => {
    const baseUrl = `/${category}/${type}s`;
    return baseUrl + buildParamString(sanitizeParams(params));
  };

const ogIframeFactory = (url: HttpsUrl, token: string | Nil): HttpsUrl => {
  const tokenParam = token ? `&slurm=${token}` : '';
  return `${url}/?embedded_mode=true${tokenParam}`;
};

export const UrlBuilder = {
  history: {
    category: (params: UrlBuilderParams) => {
      return categoryDrilldownFactory('history')(params);
    },
    all: ({ page }: UrlBuilderParams) => {
      return `/history${buildParamString({ page })}`;
    },
  },
  watched: (params: UrlBuilderParams) => {
    return categoryDrilldownFactory('watched')(params);
  },
  trending(params: UrlBuilderParams) {
    return mediaDrilldownFactory('trending')(params);
  },
  hot(params: UrlBuilderParams) {
    return mediaDrilldownFactory('hot')(params);
  },
  recommended(params: UrlBuilderParams) {
    return mediaDrilldownFactory('recommended')(params);
  },
  anticipated(params: UrlBuilderParams) {
    return mediaDrilldownFactory('anticipated')(params);
  },
  popular(params: UrlBuilderParams) {
    return mediaDrilldownFactory('popular')(params);
  },
  social: {
    activity: (_: UrlBuilderParams) => {
      return '/social/activity';
    },
  },
  progress: (user: string) => `/users/${user}/progress`,
  home: () => '/',
  shows: () => '/shows',
  media: (type: MediaType, id: string) => {
    switch (type) {
      case 'show':
        return UrlBuilder.show(id);
      case 'movie':
        return UrlBuilder.movie(id);
    }
  },
  show: (id: string, params: Record<string, string | number> = {}) =>
    `/shows/${id}${buildParamString(params)}`,
  movies: () => '/movies',
  movie: (id: string) => `/movies/${id}`,
  people: (id: string) => `/people/${id}`,
  episode: (id: string, season: number, episode: number) =>
    `/shows/${id}/seasons/${season}/episodes/${episode}`,
  profile: {
    user: (username: string) => `/profile/${username}`,
    me: () => UrlBuilder.profile.user('me'),
  },
  users: (id: string) => ({
    lists: (slug: string, type?: MediaType) =>
      type
        ? `/users/${id}/lists/${slug}?type=${type}`
        : `/users/${id}/lists/${slug}`,
    yearToDate: (year: number) => `/users/${id}/year/${year}`,
    monthInReview: (year: number, month: number) =>
      `/users/${id}/mir/${year}/${month}`,
  }),
  lists: {
    official: (id: number, type?: MediaType) =>
      `/lists/official/${id}?type=${type}`,
    user: (params?: UrlBuilderParams) => {
      if (!params) {
        return '/users/me/lists';
      }

      return categoryDrilldownFactory('users/me/lists')(params);
    },
  },
  app: {
    android: () => 'https://trakt.tv/a/trakt-android',
    ios: () => 'https://trakt.tv/a/trakt-ios',
  },
  github: () => 'https://github.com/trakt/trakt-lite',
  vip: () => 'https://trakt.tv/vip',
  og: {
    getVip: () => 'https://trakt.tv/vip',
    site: () => 'https://trakt.tv',
    status: () => 'https://status.trakt.tv',
    privacy: () => 'https://trakt.tv/privacy',
    support: () => 'mailto:support@trakt.tv',
    frame: {
      yearToDate: (slug: string, year: string, token: string | Nil) =>
        ogIframeFactory(`https://trakt.tv/users/${slug}/year/${year}`, token),
      monthInReview: (
        slug: string,
        year: string,
        month: string,
        token: string | Nil,
      ) =>
        ogIframeFactory(
          `https://trakt.tv/users/${slug}/mir/${year}/${month}`,
          token,
        ),
    },
  },
  login: {
    activate: () => '/auth/device',
  },
  settings: () => '/settings',
};
