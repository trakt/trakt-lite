import { useQuery } from '$lib/features/query/useQuery.ts';
import type { MediaListSummary } from '$lib/requests/models/MediaListSummary.ts';
import type { MediaType } from '$lib/requests/models/MediaType.ts';
import { listItemsQuery } from '$lib/requests/queries/lists/listItemsQuery.ts';
import { userListItemsQuery } from '$lib/requests/queries/users/userListItemsQuery.ts';
import { toLoadingState } from '$lib/utils/requests/toLoadingState.ts';
import { derived } from 'svelte/store';

const PREVIEW_LIMIT = 8;

type UseListItemsProps = {
  list: MediaListSummary;
  type?: MediaType;
};

function listToQuery(
  { list, type }: UseListItemsProps,
) {
  const commonParams = {
    type,
    limit: PREVIEW_LIMIT,
  };

  if (list.user.slug) {
    return userListItemsQuery({
      ...commonParams,
      userId: list.user.slug,
      listId: list.slug,
    });
  }

  return listItemsQuery({
    ...commonParams,
    listId: `${list.id}`,
  });
}

export function useListItems(props: UseListItemsProps) {
  const items = useQuery(listToQuery(props));

  const isLoading = derived(
    items,
    toLoadingState,
  );

  return {
    isLoading,
    items: derived(items, ($list) => $list.data?.entries ?? []),
  };
}
