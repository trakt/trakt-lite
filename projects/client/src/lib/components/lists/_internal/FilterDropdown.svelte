<script lang="ts">
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import DropdownList from "$lib/components/dropdown/DropdownList.svelte";
  import type { QuickFilter } from "$lib/features/filters/QuickFilters";

  const {
    filter,
  }: {
    filter: QuickFilter;
  } = $props();
</script>

<div class="trakt-filter-dropdown">
  <p class="secondary meta-info">{filter.label}</p>
  <DropdownList
    label=""
    style="flat"
    variant="primary"
    text="capitalize"
    size="small"
  >
    <p class="meta-info">Current value</p>
    {#snippet items()}
      {#each filter.values as value}
        <DropdownItem color="purple" onclick={() => filter.onFilter(value)}>
          {value.label}
        </DropdownItem>
      {/each}
    {/snippet}
  </DropdownList>
</div>

<style>
  .trakt-filter-dropdown {
    display: flex;
    align-items: center;

    gap: var(--gap-xxxs);

    :global(.is-list-open) {
      color: var(--shade-920);
    }
  }
</style>
