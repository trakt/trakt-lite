import type { QuickFilters } from '$lib/features/filters/QuickFilters.ts';
import type { PaginatableStore } from '$lib/sections/lists/drilldown/PaginatableStore.ts';
import type { Snippet } from 'svelte';

export type MediaListProps<T, M> = {
  id: string;
  title: string;
  type: M;
  item: Snippet<[T]>;
  useList: PaginatableStore<T, M>;
  actions?: Snippet<[T[], M]>;
  empty?: Snippet;
  badge?: Snippet;
  dynamicActions?: Snippet;
  filters?: QuickFilters;
};
