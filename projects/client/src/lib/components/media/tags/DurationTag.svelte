<script lang="ts">
  import TagContent from "$lib/components/tags/TagContent.svelte";
  import type { TagIntl } from "./TagIntl";

  const {
    runtime,
    i18n,
  }: {
    runtime: number;
    i18n: TagIntl;
  } = $props();
</script>

<div class="trakt-duration-tag">
  <TagContent>
    <p class="meta-info capitalize no-wrap">
      {i18n.toDuration(runtime)}
    </p>
  </TagContent>
</div>

<style>
  .trakt-duration-tag {
    :global(.trakt-tag) {
      background: var(--color-background-duration-tag);
      color: var(--color-text-duration-tag);
    }
  }
</style>
