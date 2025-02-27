import * as m from '$lib/features/i18n/messages.ts';

import { getLocale, languageTag } from '$lib/features/i18n/index.ts';
import { toHumanDuration } from '$lib/utils/formatting/date/toHumanDuration.ts';

import { toHumanETA } from '$lib/utils/formatting/date/toHumanETA.ts';
import { toHumanNumber } from '$lib/utils/formatting/number/toHumanNumber.ts';
import { pluralize } from '$lib/utils/formatting/string/pluralize.ts';
import type { TagIntl } from './TagIntl.ts';

export const TagIntlProvider: TagIntl = {
  toDuration: (duration) =>
    toHumanDuration({ minutes: duration }, languageTag()),
  toEpisodeCount: (count) => pluralize('number_of_episodes', count),
  toPlayCount: (count) =>
    m.plays({ number: toHumanNumber(count, languageTag()) }),
  toWatcherCount: (count) => m.active_watchers({ count }),
  toReleaseEstimate: (airDate) => toHumanETA(new Date(), airDate, getLocale()),
  tbaLabel: () => m.tba_label(),
  toAnticipatedCount: (count) =>
    m.anticipated_count({ count: toHumanNumber(count, languageTag()) }),
};
