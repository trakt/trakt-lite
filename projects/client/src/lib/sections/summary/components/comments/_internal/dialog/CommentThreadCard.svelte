<script lang="ts">
  import Card from "$lib/components/card/Card.svelte";
  import type { MediaComment } from "$lib/requests/models/MediaComment";
  import type { MediaEntry } from "$lib/requests/models/MediaEntry";
  import LikeCommentAction from "../comment-actions/LikeCommentAction.svelte";
  import ReplyButton from "../comment-actions/ReplyButton.svelte";
  import ViewRepliesAction from "../comment-actions/ViewRepliesAction.svelte";
  import CommentBody from "../CommentBody.svelte";
  import CommentFooter from "../CommentFooter.svelte";
  import CommentHeader from "../CommentHeader.svelte";
  import ShadowScroller from "../ShadowScroller.svelte";
  import CommentInput from "./CommentInput.svelte";
  import { useCommentReplies } from "./useCommentReplies";

  type CommentThreadCardProps = {
    comment: MediaComment;
    media: MediaEntry;
    reset: () => void;
    isReplying: boolean;
    setReplying: (comment: MediaComment, isReplying: boolean) => void;
  };

  const {
    comment,
    media,
    isReplying,
    setReplying,
    reset,
  }: CommentThreadCardProps = $props();
  const { list } = $derived(useCommentReplies({ id: comment.id }));
</script>

<Card
  --width-card="var(--width-comment-thread-card)"
  --height-card="min(var(--height-comment-thread-card), calc(0.65 * var(--dialog-height)))"
>
  <div class="trakt-comment-thread-container">
    <CommentHeader {comment} />

    <ShadowScroller>
      <div class="trakt-comment-thread">
        <CommentBody {comment} {media} />

        {#if $list}
          {#each $list as reply}
            <div class="trakt-comment-container">
              <CommentHeader comment={reply} />
              <CommentBody comment={reply} {media} />
              <CommentFooter>
                <LikeCommentAction {comment} />
              </CommentFooter>
            </div>
          {/each}
        {/if}
      </div>
    </ShadowScroller>

    <CommentFooter>
      <LikeCommentAction {comment} />
      <ViewRepliesAction {comment} />
      <ReplyButton
        {comment}
        onClick={() => setReplying(comment, !isReplying)}
      />
    </CommentFooter>

    {#if isReplying}
      <CommentInput {comment} onCommentPost={reset} />
    {/if}
  </div>
</Card>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-comment-thread-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-m);
    justify-content: flex-start;

    padding: var(--ni-16) var(--ni-20);

    height: 100%;
    box-sizing: border-box;

    :global(.trakt-spoiler) {
      cursor: pointer;
    }
  }

  .trakt-comment-thread {
    display: flex;
    flex-direction: column;
    gap: var(--gap-xl);
  }

  .trakt-comment-container {
    --comment-reply-offset: calc(var(--ni-32) + var(--gap-s));

    :global(.trakt-shadow-wrapper) {
      margin-left: var(--comment-reply-offset);
    }

    :global(.trakt-comment-footer) {
      margin-left: calc(var(--comment-reply-offset) + var(--ni-neg-18));
    }

    display: flex;
    flex-direction: column;
    gap: var(--gap-s);
  }
</style>
