<script>
  import LoaderIcon from "$lib/components/icons/LoaderIcon.svelte";
  import { fade } from "svelte/transition";
</script>

<div class="loading-indicator" out:fade={{ duration: 150 }}>
  <LoaderIcon />
</div>

<style>
  .loading-indicator {
    display: flex;
    justify-content: center;

    :global(svg) {
      width: var(--ni-56);
      height: var(--ni-56);

      animation: spin 2s infinite linear;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
</style>
