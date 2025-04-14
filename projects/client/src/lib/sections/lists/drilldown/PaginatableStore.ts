import type { FilterParams } from '$lib/requests/models/FilterParams.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import type { Readable } from 'svelte/store';

export type PaginatableStore<T, M = MediaType> = (
  params: { type: M; page: number; limit: number } & FilterParams,
) => {
  list: Readable<T[]>;
  page: Readable<{ total?: number }>;
  isLoading: Readable<boolean>;
};
