import type { SettingsResponse, SortDirection, WatchAction } from '$lib/api.ts';
import { authHeader } from '$lib/features/auth/stores/authHeader.ts';
import { ALIEN_ISOLATION_COVER } from '$lib/utils/constants.ts';
import { api, type ApiParams } from '../../../requests/_internal/api.ts';

export type UserSettings = {
  name: {
    full: string;
    first: string;
    last: string;
  };
  location?: string;
  avatar: {
    url: string;
  };
  cover: {
    url: string;
  };
  isVip: boolean;
  preferences: {
    progress: {
      sort: {
        by?: string;
        direction?: SortDirection;
      };
    };
    watch: {
      action?: WatchAction;
    };
  };
};

function useDefined(
  ...values: Array<string | Nil>
) {
  return values.find((value) => value?.trim());
}

function mapUserSettingsResponse(response: SettingsResponse): UserSettings {
  const { user, account, browsing } = response;
  const fullName = user.name;
  const [firstName = '', lastName = ''] = user.name.split(' ');

  return {
    name: {
      full: fullName,
      first: firstName,
      last: lastName,
    },
    location: user.location,
    avatar: {
      url: user.images!.avatar.full,
    },
    cover: {
      url: useDefined(
        user.vip_cover_image,
        account.cover_image,
        ALIEN_ISOLATION_COVER,
      )!,
    },
    isVip: user.vip || user.vip_ep,
    preferences: {
      watch: {
        action: browsing?.watch_popup_action,
      },
      progress: {
        sort: {
          by: browsing?.progress.on_deck.sort,
          direction: browsing?.progress.on_deck.sort_how,
        },
      },
    },
  };
}

const currentUserRequest = ({ fetch }: ApiParams): Promise<UserSettings> =>
  api({ fetch })
    .users
    .settings({
      query: {
        extended: 'browsing',
      },
      extraHeaders: {
        ...authHeader(),
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error('Error fetching current user', response);
        /**
         * TODO: define error handling strategy/system
         */
        throw new Error('Error fetching current user.');
      }

      return response.body;
    })
    .then(mapUserSettingsResponse);

export const currentUserQueryKey = ['userSettings'] as const;
export const currentUserSettingsQuery = ({ fetch }: ApiParams = {}) => ({
  queryKey: currentUserQueryKey,
  queryFn: () => currentUserRequest({ fetch }),
});
