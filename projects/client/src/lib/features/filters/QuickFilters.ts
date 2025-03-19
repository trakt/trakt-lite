export type FilterValue = {
  id: string;
  label: string;
};

export type QuickFilter = {
  label: string;
  values: FilterValue[];
  onFilter: (value: FilterValue) => void;
};

// TODO: naming? quickfilters.filters is a bit redundant
// TODO: default values & multiselect
export type QuickFilters = {
  onReset: () => void;
  filters: QuickFilter[];
};
