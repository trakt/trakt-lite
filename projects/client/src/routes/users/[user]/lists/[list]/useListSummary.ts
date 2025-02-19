import { useQuery } from '$lib/features/query/useQuery.ts';

import { derived } from 'svelte/store';
import { userListSummaryQuery } from '../../../../../lib/requests/queries/users/userListSummaryQuery.ts';

type UseListSummaryProps = {
  userId: string;
  listId: string;
};

export function useListSummary(props: UseListSummaryProps) {
  const query = useQuery(userListSummaryQuery(props));

  return {
    list: derived(query, ($query) => $query.data),
  };
}
