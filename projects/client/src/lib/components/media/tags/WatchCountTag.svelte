<script lang="ts">
  import StemTag from "$lib/components/tags/StemTag.svelte";
  import { linear } from "svelte/easing";
  import { slide } from "svelte/transition";
  import type { TagIntl } from "./TagIntl";
  const { i18n, count }: { i18n: TagIntl; count: number } = $props();

  const TRANSITION_DURATION = 300;
</script>

<watch-count-tag>
  <StemTag
    --color-background-stem-tag="var(--color-background-watch-count-tag)"
    --color-text-stem-tag="var(--color-text-watch-count-tag)"
  >
    <p class="meta-info uppercase no-wrap">
      {i18n.watchCountLabel()}
    </p>
  </StemTag>
  <div class="trakt-watch-count">
    {#key count}
      <p
        class="meta-info uppercase no-wrap"
        transition:slide={{
          easing: linear,
          axis: "y",
          duration: TRANSITION_DURATION,
        }}
      >
        {count}
      </p>
    {/key}
  </div>
</watch-count-tag>

<style>
  watch-count-tag {
    display: flex;
    align-items: center;

    gap: var(--ni-1);

    :global(.trakt-tag) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  /* TODO: reduce duplication with tag */
  .trakt-watch-count {
    width: var(--ni-12);
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-background-watch-count-tag);
    color: var(--color-text-watch-count-tag);

    border-top-right-radius: var(--border-radius-l);
    border-bottom-right-radius: var(--border-radius-l);

    height: var(--ni-14);
    line-height: var(--ni-14);
    margin: 0;
    padding: var(--ni-2) var(--ni-8);

    .meta-info:nth-child(2) {
      position: fixed;
    }
  }
</style>
