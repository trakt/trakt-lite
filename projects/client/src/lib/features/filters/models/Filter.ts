import type { FilterKey } from '$lib/features/filters/getLocalFilters.ts';
import { genreOptionSchema } from '@trakt/api';

export type Filter = {
  id: FilterKey;
  label: string;
  values: Array<string>;
  emptyValue: string;
};

// TODO translate & sort values

export const GenreFilter: Filter = {
  id: 'genres',
  label: 'Genres',
  emptyValue: 'All',
  values: genreOptionSchema.options,
};
