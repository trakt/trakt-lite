<script lang="ts">
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import DropdownList from "$lib/components/dropdown/DropdownList.svelte";
  import RateIcon from "$lib/components/icons/RateIcon.svelte";
  import * as m from "$lib/features/i18n/messages.ts";
  import { SIMPLE_RATINGS } from "$lib/models/Ratings";
  import { useRatings } from "$lib/stores/useRatings.ts";
  import { toTranslatedValue } from "$lib/utils/formatting/string/toTranslatedValue.ts";

  const {
    type,
    id,
  }: {
    type: "movie" | "episode";
    id: number;
  } = $props();

  const { isRating, isFavorited, currentRating, addRating } = $derived(
    useRatings({
      type,
      id,
    }),
  );
</script>

<!-- TODO: sizing -->
<DropdownList
  label={m.rate_now()}
  style="flat"
  size="normal"
  color="custom"
  disabled={$isRating}
  --color-background-custom="var(--red-900)"
  --color-foreground-custom="var(--red-400)"
>
  {#if $currentRating}
    {toTranslatedValue("rating", $currentRating.simple)}
  {/if}
  {#if !$currentRating}
    {m.rate_now()}
  {/if}

  {#snippet icon()}
    {#if !$currentRating}
      <RateIcon />
    {/if}
  {/snippet}

  {#snippet items()}
    {#each SIMPLE_RATINGS as rating}
      {#if !$currentRating || $currentRating.simple != rating.simple}
        <DropdownItem
          color="red"
          onclick={() => addRating(rating, $isFavorited)}
        >
          {toTranslatedValue("rating", rating.simple)}
        </DropdownItem>
      {/if}
    {/each}
  {/snippet}
</DropdownList>

<style>
</style>
