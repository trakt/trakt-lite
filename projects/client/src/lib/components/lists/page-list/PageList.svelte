<script lang="ts" generics="T extends { id: unknown }">
  import type { ListProps } from "../ListProps";

  type PageListProps<T> = ListProps<T>;

  const { items, title, item }: PageListProps<T> = $props();
</script>

<section class="trakt-page-list-container">
  <!-- TODO: extract responsive title from section/shadow list -->
  <h3 class="trakt-page-list-title">{title}</h3>

  <div class="trakt-page-list-items">
    {#each items as i (i.id)}
      {@render item(i)}
    {/each}
  </div>
</section>

<style>
  .trakt-page-list-container {
    margin: 0 var(--layout-distance-side);

    display: flex;
    flex-direction: column;
    gap: var(--ni-16);
  }

  .trakt-page-list-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--width-item));
    justify-content: center;
    gap: var(--ni-8);
  }
</style>
