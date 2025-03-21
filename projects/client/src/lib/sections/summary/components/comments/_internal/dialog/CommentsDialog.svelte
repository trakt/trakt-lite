<script lang="ts">
  import Dialog from "$lib/components/dialogs/Dialog.svelte";
  import type { CommentsProps } from "$lib/sections/summary/components/comments/CommentsProps";
  import { writable, type Writable } from "svelte/store";
  import type { ActiveComment } from "../models/ActiveComment";
  import { useComments } from "../useComments";
  import CommentList from "./CommentList.svelte";
  import CommentThreadCard from "./CommentThreadCard.svelte";
  import { scrollIntoView } from "./scrollIntoView";
  import { useActiveComment } from "./useActiveComment";

  type CommentsDialogProps = {
    dialog: Writable<HTMLDialogElement>;
    source?: ActiveComment;
  } & CommentsProps;

  const {
    dialog = writable(),
    source,
    media,
    ...props
  }: CommentsDialogProps = $props();

  const { comments } = $derived(
    useComments({
      slug: media.slug,
      ...props,
    }),
  );

  const { reset, setReplying, activeComment } = $derived(
    useActiveComment(source),
  );
  const isReplying = (id: number) =>
    $activeComment?.id === id && $activeComment?.isReplying;
</script>

<Dialog title="Comments" {dialog} onClose={reset}>
  <div class="trakt-comment-threads">
    <CommentList
      id={`comment-threads-list-${media.slug}`}
      items={$comments}
      title=""
      --height-list="min(var(--height-comment-thread-list), 70vh)"
    >
      {#snippet item(comment)}
        <comment-thread use:scrollIntoView={comment.id === source?.id}>
          <CommentThreadCard
            {comment}
            {media}
            {reset}
            {setReplying}
            isReplying={isReplying(comment.id)}
          />
        </comment-thread>
      {/snippet}
    </CommentList>
  </div>
</Dialog>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-comment-threads {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @include for-mobile {
      :global(.trakt-list-header) {
        display: none;
      }
    }
  }
</style>
