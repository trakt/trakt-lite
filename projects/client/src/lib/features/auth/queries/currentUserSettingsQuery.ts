import {
  genreOptionSchema,
  type SettingsResponse,
  upNextSortOptionSchema,
} from '$lib/api.ts';
import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { error } from '$lib/utils/console/print.ts';
import { DEFAULT_COVER } from '$lib/utils/constants.ts';
import { findDefined } from '$lib/utils/string/findDefined.ts';
import { prependHttps } from '$lib/utils/url/prependHttps.ts';
import { z } from 'zod';
import { api, type ApiParams } from '../../../requests/api.ts';

export const UserSettingsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.object({
    full: z.string(),
    first: z.string(),
    last: z.string(),
  }),
  about: z.string().optional(),
  location: z.string().optional(),
  avatar: z.object({
    url: z.string(),
  }),
  cover: z.object({
    url: z.string(),
  }),
  isVip: z.boolean(),
  preferences: z.object({
    progress: z.object({
      sort: z.object({
        by: upNextSortOptionSchema,
        direction: z.enum(['asc', 'desc']).optional(),
      }),
    }),
    watch: z.object({
      action: z.enum(['now', 'released']),
    }),
    isSpoilerHidden: z.boolean().optional(),
  }),
  genres: genreOptionSchema.array(),
  watchNow: z.object({
    country: z.string().optional(),
    favorites: z.array(z.string()).optional(),
    showOnlyFavorites: z.boolean().optional(),
  }),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;

function mapUserSettingsResponse(response: SettingsResponse): UserSettings {
  const { user, account, browsing } = response;
  const fullName = user.name ?? '';
  const [firstName = '', lastName = ''] = fullName.split(' ');

  return {
    id: user.ids.uuid,
    slug: user.ids.slug,
    name: {
      full: fullName,
      first: firstName,
      last: lastName,
    },
    about: user.about,
    location: user.location ?? '',
    avatar: {
      url: user.images.avatar.full,
    },
    cover: {
      url: prependHttps(
        findDefined(
          user.vip_cover_image,
          account.cover_image,
        ),
        DEFAULT_COVER,
      ),
    },
    isVip: user.vip || user.vip_ep,
    preferences: {
      watch: {
        action: browsing?.watch_popup_action === 'ask'
          ? 'now'
          : browsing?.watch_popup_action ?? 'now',
      },
      progress: {
        sort: {
          by: 'added',
          direction: browsing?.progress.on_deck.sort_how,
        },
      },
      isSpoilerHidden: Object.values(browsing?.spoilers ?? {})
        .some((topic) => topic?.includes('hide')),
    },
    genres: browsing?.genres.favorites ?? [],
    watchNow: {
      country: browsing?.watchnow.country,
      favorites: browsing?.watchnow.favorites,
      showOnlyFavorites: browsing?.watchnow.only_favorites,
    },
  };
}

const currentUserRequest = ({ fetch }: ApiParams) =>
  api({ fetch })
    .users
    .settings({
      query: {
        extended: 'browsing',
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        error('Error fetching current user', response);
        /**
         * TODO: define error handling strategy/system
         */
        throw new Error('Error fetching current user.');
      }

      return response.body;
    });

export const currentUserQueryKey = ['userSettings'] as const;
export const currentUserSettingsQuery = defineQuery({
  key: 'currentUserSettings',
  invalidations: [],
  dependencies: [],
  request: currentUserRequest,
  mapper: mapUserSettingsResponse,
  schema: UserSettingsSchema,
});
