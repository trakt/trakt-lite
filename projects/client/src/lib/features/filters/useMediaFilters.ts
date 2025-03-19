import type {
  FilterValue,
  QuickFilters,
} from '$lib/features/filters/QuickFilters.ts';
import * as m from '$lib/features/i18n/messages.ts';
import type { MediaEntry } from '$lib/requests/models/MediaEntry.ts';

export function useMediaFilters(mediaEntries: MediaEntry[]): QuickFilters {
  const allGenres = [...new Set(mediaEntries.flatMap((media) => media.genres))];

  const genreFilter = {
    label: m.genre(),
    values: allGenres.map((g) => ({ id: g, label: g })),
    onFilter: (value: FilterValue) => {
      console.log(value);
    },
  };

  const statusFilter = {
    label: 'Status',
    values: [
      {
        id: 'personal',
        label: 'Personal',
      },
      {
        id: 'all',
        label: 'All',
      },
    ],
    onFilter: (value: FilterValue) => {
      console.log(value);
    },
  };

  return {
    filters: [statusFilter, genreFilter],
    onReset: () => {
      console.log('reset');
    },
  };
}
