<script lang="ts">
  import Preview from "$lib/components/badge/Preview.svelte";
  import SectionList from "$lib/components/lists/section-list/SectionList.svelte";
  import * as m from "$lib/features/i18n/messages.ts";
  import CommentCard from "./_internal/CommentCard.svelte";
  import { useComments } from "./_internal/useComments";
  import type { CommentsProps } from "./CommentsProps";

  const { media, ...props }: CommentsProps = $props();

  const { isLoading, comments } = $derived(
    useComments({
      slug: media.slug,
      ...props,
    }),
  );

  const topLevelComments = $derived(
    $comments.filter((comment) => comment.parentId === 0),
  );
</script>

<SectionList
  id={`comments-list-${media.slug}`}
  items={topLevelComments}
  title={m.popular_comments()}
  --height-list="var(--height-comments-list)"
>
  {#snippet item(comment)}
    <CommentCard {comment} {media} />
  {/snippet}

  {#snippet empty()}
    {#if !$isLoading}
      <p class="small">{m.no_comments()}</p>
    {/if}
  {/snippet}

  {#snippet badge()}
    <Preview />
  {/snippet}
</SectionList>
