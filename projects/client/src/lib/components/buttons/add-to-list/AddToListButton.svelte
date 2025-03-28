<script lang="ts">
  import DropdownList from "$lib/components/dropdown/DropdownList.svelte";
  import WatchlistIcon from "$lib/components/icons/WatchlistIcon.svelte";
  import type { AddToListButtonProps } from "./AddToListButtonProps";

  const {
    title,
    isListUpdating,
    isListed,
    onAdd,
    onRemove,
    items: externalItems,
    ...props
  }: AddToListButtonProps = $props();

  const state = $derived(isListed ? "added" : "missing");
</script>

<DropdownList
  label={title}
  variant="secondary"
  text="capitalize"
  color="blue"
  style="flat"
  {...props}
>
  Add to list
  {#snippet icon()}
    <WatchlistIcon size="small" {state} />
  {/snippet}
  {#snippet items()}
    {@render externalItems()}
  {/snippet}
</DropdownList>
