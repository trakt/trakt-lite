<script lang="ts">
  import { appendClassList } from "$lib/utils/actions/appendClassList";

  const { children, classList }: ChildrenProps & { classList: string } =
    $props();
</script>

<div class="trakt-list-container" use:appendClassList={classList}>
  {@render children()}
</div>

<style>
  .trakt-list-container {
    padding: 0;
    padding-right: var(--layout-distance-side);
    padding-left: calc(
      2 * var(--layout-distance-side) + var(--side-navbar-width)
    );
  }
</style>
