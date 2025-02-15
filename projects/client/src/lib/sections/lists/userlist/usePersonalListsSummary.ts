import { useQuery } from '$lib/features/query/useQuery.ts';
import { collaborationListsQuery } from '$lib/requests/queries/users/collaborationListsQuery.ts';
import { personalListsQuery } from '$lib/requests/queries/users/personalListsQuery.ts';
import type { PersonalListType } from '$lib/sections/lists/userlist/models/PersonalListType.ts';
import { toLoadingState } from '$lib/utils/requests/toLoadingState.ts';
import { derived } from 'svelte/store';

type PersonalListsParams = {
  type: PersonalListType;
};

function typeToQuery({ type }: PersonalListsParams) {
  switch (type) {
    case 'personal':
      return personalListsQuery();
    case 'collaboration':
      return collaborationListsQuery();
  }
}

export function usePersonalListsSummary({ type }: PersonalListsParams) {
  const lists = useQuery(typeToQuery({ type }));

  const isLoading = derived(
    lists,
    toLoadingState,
  );

  return {
    isLoading,
    lists: derived(lists, ($lists) => $lists.data ?? []),
  };
}
