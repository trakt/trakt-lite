<script lang="ts">
  import ActionButton from "$lib/components/buttons/ActionButton.svelte";
  import ReplyIcon from "$lib/components/icons/ReplyIcon.svelte";
  import * as m from "$lib/features/i18n/messages.ts";
  import type { MediaComment } from "$lib/requests/models/MediaComment";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import SpoilerSwitch from "./SpoilerSwitch.svelte";
  import { MIN_ROWS, useDynamicTextArea } from "./useDynamicTextArea";
  import { useReplyToComment } from "./useReplyToComment";

  type CommentInputProps = {
    comment: MediaComment;
    onCommentPost: () => void;
  };

  const { comment, onCommentPost }: CommentInputProps = $props();

  const { isPostingReply, replyToComment } = useReplyToComment({
    id: comment.id,
  });
  const { text, autoResizeArea } = $derived(useDynamicTextArea());

  const isSpoiler = writable(false);

  const onReply = async () => {
    await replyToComment({
      comment: $text.comment,
      isSpoiler: $isSpoiler,
    });

    onCommentPost();
  };

  function focusOnMount(node: HTMLElement) {
    onMount(() => {
      node.focus();
    });
  }

  // TODO fix ios
</script>

<div
  class="trakt-comment-reply-box"
  class:is-multi-line={$text.lineCount > 1}
  transition:slide={{ duration: 150 }}
>
  <textarea
    disabled={$isPostingReply}
    use:autoResizeArea
    use:focusOnMount
    rows={MIN_ROWS}
    placeholder={m.comment_reply_placeholder()}
  ></textarea>

  <div class="trakt-comment-actions">
    <SpoilerSwitch
      isReplying={$isPostingReply}
      enabled={$isSpoiler}
      onclick={() => isSpoiler.update((value) => !value)}
    />

    <ActionButton
      onclick={onReply}
      label="Reply"
      style="ghost"
      color="purple"
      size="small"
      variant="secondary"
      disabled={$isPostingReply || !$text.hasContent}
    >
      <ReplyIcon style={$text.hasContent ? "filled" : "open"} />
    </ActionButton>
  </div>
</div>

<style>
  .trakt-comment-reply-box {
    width: 100%;

    display: flex;
    align-items: center;
    gap: var(--gap-s);

    padding: var(--ni-8);
    padding-left: var(--ni-16);
    box-sizing: border-box;

    border-radius: var(--border-radius-s);
    border: var(--ni-2) var(--purple-50) solid;

    backdrop-filter: blur(var(--ni-4));
    color: var(--shade-10);

    transition: border-color var(--transition-increment) ease-in-out;

    textarea {
      all: unset;
      flex-grow: 1;

      &::-webkit-scrollbar-corner {
        background-color: transparent;
      }
    }

    &:has(textarea:focus-within) {
      border-color: var(--purple-500);
    }

    &:has(textarea[disabled]) {
      border-color: var(--color-surface-button-disabled);
    }

    &:global(.is-multi-line) {
      flex-direction: column;
      align-items: flex-end;

      textarea {
        width: 100%;
        flex-grow: initial;
      }
    }
  }

  .trakt-comment-actions {
    display: flex;
    align-items: center;

    gap: var(--gap-s);
  }
</style>
