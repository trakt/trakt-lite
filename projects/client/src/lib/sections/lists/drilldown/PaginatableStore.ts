import type { QuickFilters } from '$lib/features/filters/QuickFilters.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import type { Readable } from 'svelte/store';

export type PaginatableStore<T, M = MediaType> = (
  params: { type: M; page: number; limit: number },
) => {
  list: Readable<T[]>;
  page: Readable<{ total?: number }>;
  isLoading: Readable<boolean>;
  filters?: QuickFilters;
};
