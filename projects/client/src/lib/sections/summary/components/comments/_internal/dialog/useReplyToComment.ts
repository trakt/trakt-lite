import { useUser } from '$lib/features/auth/stores/useUser.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { replyCommentRequest } from '$lib/requests/queries/comments/replyCommentRequest.ts';
import { useInvalidator } from '$lib/stores/useInvalidator.ts';
import { resolve } from '$lib/utils/store/resolve.ts';
import { writable } from 'svelte/store';

type UseReplyToCommentProps = {
  id: number;
};

type ReplyToCommentProps = {
  comment: string;
  isSpoiler: boolean;
};

export function useReplyToComment(
  { id }: UseReplyToCommentProps,
) {
  const { user } = useUser();
  const isPostingReply = writable(false);
  const { invalidate } = useInvalidator();

  const replyToComment = async (
    { comment, isSpoiler }: ReplyToCommentProps,
  ) => {
    const current = await resolve(user);

    if (!current) {
      return;
    }

    isPostingReply.set(true);

    await replyCommentRequest({
      id,
      body: {
        comment,
        spoiler: isSpoiler,
      },
    });
    await invalidate(InvalidateAction.ReplyToComment);

    isPostingReply.set(false);
  };

  return {
    replyToComment,
    isPostingReply,
  };
}
