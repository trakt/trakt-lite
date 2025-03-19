<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import type { QuickFilters } from "$lib/features/filters/QuickFilters";
  import { slide } from "svelte/transition";
  import FilterDropdown from "./FilterDropdown.svelte";

  // TODO: intl

  const { filters, isOpen }: { filters?: QuickFilters; isOpen: boolean } =
    $props();
</script>

<trakt-list-filters>
  {#if filters && isOpen}
    <div class="trakt-list-filters" transition:slide={{ duration: 150 }}>
      <Button
        label=""
        onclick={filters.onReset}
        style="ghost"
        color="red"
        variant="secondary"
        size="small"
      >
        Reset
      </Button>

      {#each filters.filters as filter}
        <FilterDropdown {filter} />
      {/each}
    </div>
  {/if}
</trakt-list-filters>

<style>
  trakt-list-filters {
    height: var(--ni-16);
  }

  .trakt-list-filters {
    height: var(--ni-16);

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: var(--gap-m);

    /* TODO: inset prop */
    margin-right: var(--layout-distance-side);
  }
</style>
