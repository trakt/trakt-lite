export const FILTERS_KEY = 'trakt-global-filters';

export type FilterKey = 'genres';

export type StoredFilter = {
  id: FilterKey;
  value: string;
};

export const getLocalFilters = (): StoredFilter[] => {
  const storedFilters = localStorage.getItem(FILTERS_KEY);
  return storedFilters ? JSON.parse(storedFilters) : [];
};

export const getFilterParams = () => {
  const filters = getLocalFilters();

  return filters.reduce((queryParams, filter) => {
    queryParams[filter.id] = filter.value;
    return queryParams;
  }, {} as Record<FilterKey, string>);
};
