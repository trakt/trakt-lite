<script lang="ts">
  import TrollIcon from "$lib/components/icons/TrollIcon.svelte";
  import YouTubeIcon from "$lib/components/icons/YouTubeIcon.svelte";
  import { DEFAULT_TRAILER } from "$lib/utils/constants";

  const {
    trailer = DEFAULT_TRAILER,
  }: {
    trailer?: string;
  } = $props();

  const isDefaultTrailer = $derived(trailer === DEFAULT_TRAILER);
</script>

<div class="trakt-trailer-overlay">
  <div class="trakt-trailer-icon">
    {#if isDefaultTrailer}
      <TrollIcon />
    {:else}
      <YouTubeIcon />
    {/if}
  </div>
</div>

<style>
  .trakt-trailer-overlay {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .trakt-trailer-icon {
    border-radius: 50%;
    background-color: var(--color-background-red);
    padding: var(--ni-16);
    width: var(--ni-56);
    height: var(--ni-56);

    :global(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>
