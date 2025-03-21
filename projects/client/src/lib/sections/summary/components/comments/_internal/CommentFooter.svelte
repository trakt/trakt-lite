<script lang="ts">
  const { children }: ChildrenProps = $props();
</script>

<div class="trakt-comment-footer">
  {@render children()}
</div>

<style>
  .trakt-comment-footer {
    height: var(--ni-40);

    display: flex;
    align-items: center;
    justify-content: space-between;

    :global(.trakt-button) {
      display: flex;
      flex-direction: row-reverse;
    }

    /* To align icons of the first and last ghost buttons */
    margin-left: var(--ni-neg-18);
    margin-right: var(--ni-neg-18);
  }
</style>
