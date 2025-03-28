<script lang="ts">
  import AddToListButton from "$lib/components/buttons/add-to-list/AddToListButton.svelte";
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import type { MediaStoreProps } from "$lib/models/MediaStoreProps";
  import { usePersonalListsSummary } from "$lib/sections/lists/user/usePersonalListsSummary";
  import WatchlistAction from "../watchlist/WatchlistAction.svelte";
  import { useList } from "./useList";

  type ListActionProps = MediaStoreProps;

  const { ...target }: ListActionProps = $props();

  const { lists: personalLists } = usePersonalListsSummary({
    type: "personal",
  });
  const { lists: collaborativeLists } = usePersonalListsSummary({
    type: "collaboration",
  });

  // TODO check all lists and get all items? Or find a better way to check if it's listed
  const { addToList, removeFromList } = $derived(useList(target));

  const { lists } = useUser();
  $inspect($lists);
</script>

<AddToListButton
  title="TODO"
  isListed={false}
  isListUpdating={false}
  onAdd={() => {}}
  onRemove={() => {}}
>
  {#snippet items()}
    <WatchlistAction style="dropdown-item" title="TODO" {...target} />
    {#each $personalLists as list}
      <DropdownItem
        color="purple"
        onclick={() => {
          addToList(list.slug);
        }}
        style="flat"
      >
        {list.name}
      </DropdownItem>
    {/each}
    {#each $collaborativeLists as list}
      <DropdownItem color="default" onclick={() => {}} style="flat">
        {list.name}
      </DropdownItem>
    {/each}
  {/snippet}
</AddToListButton>
