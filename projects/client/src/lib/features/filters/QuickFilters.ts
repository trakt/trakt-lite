type FilterValue = {
  id: string;
  label: string;
};

export type QuickFilter = {
  label: string;
  values: FilterValue[];
  onFilter: (value: FilterValue) => void;
};

export type QuickFilters = {
  onReset: () => void;
  filters: QuickFilter[];
};
