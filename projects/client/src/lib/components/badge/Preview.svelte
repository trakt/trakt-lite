<script lang="ts">
  import { tooltip } from "$lib/utils/actions/tooltip";
  import StemTag from "../tags/StemTag.svelte";

  const { description }: { description: string } = $props();
</script>

<div class="trakt-preview-badge" use:tooltip={description}>
  <StemTag
    --color-background-stem-tag={"var(--color-background-preview-tag)"}
    --color-text-stem-tag={"var(--color-text-preview-tag)"}
  >
    Preview
  </StemTag>
</div>

<!-- 
<div class="trakt-preview-badge" use:tooltip={description}>
  <h6>Preview</h6>
</div>

<style>
  .trakt-preview-badge {
    border-radius: var(--border-radius-l);

    height: var(--ni-32);
    padding: var(--ni-12);
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #56bbc613;

    animation: rotateShadows 8s linear infinite;
    box-shadow:
      inset 0 0 25px #fff,
      inset 10px 0 20px violet,
      inset -10px 0 20px #0ff,
      inset 10px 0 20px violet,
      inset -10px 0 20px #0ff,
      0 0 25px #fff,
      -5px 0 30px violet,
      5px 0 30px #0ff;
  }

  @keyframes rotateShadows {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
</style> -->

<style>
  .trakt-preview-badge {
    user-select: none;
  }
</style>
