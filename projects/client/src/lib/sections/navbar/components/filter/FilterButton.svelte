<script lang="ts">
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import DropdownList from "$lib/components/dropdown/DropdownList.svelte";
  import FilterIcon from "$lib/components/icons/FilterIcon.svelte";
  import { GenreFilter } from "$lib/features/filters/models/Filter";
  import { useFilters } from "$lib/features/filters/useFilters";

  const { storedFilters, setFilterValue, resetFilter } = useFilters();

  const hasActiveFilters = $derived($storedFilters.length > 0);
  const currentValue = $derived(
    $storedFilters.find((filter) => filter.id === GenreFilter.id)?.value,
  );
  const filterLabel = $derived(currentValue ?? "Filter");
  /*
    Not genre filterable: calendar/up-next/recommendations/history/social activity
  */

  //  TODO intl
</script>

<trakt-filter>
  <DropdownList
    label="TODO"
    variant="secondary"
    text="capitalize"
    size="small"
    style="flat"
    color={hasActiveFilters ? "blue" : "default"}
  >
    <!-- TODO: no label? -->
    {filterLabel}
    {#snippet icon()}
      <FilterIcon style={hasActiveFilters ? "filtered" : "unfiltered"} />
    {/snippet}

    {#snippet items()}
      <DropdownItem
        color="red"
        onclick={() => {
          resetFilter(GenreFilter.id);
        }}
      >
        Reset
      </DropdownItem>
      {#each GenreFilter.values as filterValue}
        <DropdownItem
          color="blue"
          disabled={filterValue === currentValue}
          onclick={() => {
            setFilterValue(GenreFilter.id, filterValue);
          }}
        >
          {filterValue}
        </DropdownItem>
      {/each}
    {/snippet}
  </DropdownList>
</trakt-filter>

<style>
  trakt-filter {
    :global(.trakt-list) {
      min-width: var(--ni-176);
    }
  }
</style>
