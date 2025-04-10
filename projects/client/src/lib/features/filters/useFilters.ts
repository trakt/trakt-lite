import type {
  FilterKey,
  StoredFilter,
} from '$lib/features/filters/getLocalFilters.ts';
import {
  FILTERS_KEY,
  getLocalFilters,
} from '$lib/features/filters/getLocalFilters.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { useInvalidator } from '$lib/stores/useInvalidator.ts';
import { writable } from 'svelte/store';

// TODO filter provider & no persistence yet; simplify logic, only 1 filter
// TODO follow-up?: sidebar for larger devices & on mobile a bottom drawer
export function useFilters() {
  const storedFilters = writable<StoredFilter[]>(getLocalFilters());
  const { invalidate } = useInvalidator();

  const updateFilters = (filters: StoredFilter[]) => {
    storedFilters.set(filters);
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
    invalidate(InvalidateAction.Filter);
  };

  const setFilterValue = (id: FilterKey, value: string) => {
    const filters = getLocalFilters();
    const filter = filters.find((filter) => filter.id === id);

    if (filter) {
      filter.value = value;
    } else {
      filters.push({ id, value });
    }

    updateFilters(filters);
  };

  const resetFilter = (id: FilterKey) => {
    const filters = getLocalFilters();
    const updatedFilters = filters.filter((filter) => filter.id !== id);

    updateFilters(updatedFilters);
  };

  return {
    setFilterValue,
    resetFilter,
    storedFilters,
  };
}
