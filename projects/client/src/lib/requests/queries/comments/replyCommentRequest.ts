import { api, type ApiParams } from '$lib/requests/api.ts';
import type { CommentReplyParams } from '@trakt/api';

type ReplyCommentParams = { id: number; body: CommentReplyParams } & ApiParams;

// TODO errors
export function replyCommentRequest(
  { fetch, id, body }: ReplyCommentParams,
): Promise<boolean> {
  return api({ fetch })
    .comments
    .reply({
      params: {
        id: `${id}`,
      },
      body,
    })
    .then(({ status }) => status === 204);
}
