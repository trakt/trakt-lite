import type { MediaStoreProps } from '$lib/models/MediaStoreProps.ts';
import { addToListRequest } from '$lib/requests/queries/users/addToListRequest.ts';
import { removeFromListRequest } from '$lib/requests/queries/users/removeFromListRequest.ts';
import { toBulkPayload } from '$lib/sections/media-actions/_internal/toBulkPayload.ts';

// TODO invalidates, loading states, etc.
export function useList(props: MediaStoreProps) {
  const { type } = props;
  const media = Array.isArray(props.media) ? props.media : [props.media];

  const ids = media.map(({ id }) => id);
  const body = toBulkPayload(type, ids);

  const addToList = async (listId: string) => {
    if (type === 'episode') {
      return;
    }

    await addToListRequest({
      listId,
      body,
    });
  };

  const removeFromList = async (listId: string) => {
    if (type === 'episode') {
      return;
    }

    await removeFromListRequest({
      listId,
      body,
    });
  };

  return {
    addToList,
    removeFromList,
  };
}
