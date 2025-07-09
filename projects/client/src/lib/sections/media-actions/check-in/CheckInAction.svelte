<script lang="ts">
  import CheckInButton from "$lib/components/buttons/check-in/CheckInButton.svelte";
  import type { CheckInActionProps } from "./CheckInActionProps.ts";
  import { useCheckIn } from "./useCheckIn.ts";

  const {
    style = "action",
    size = "normal",
    title,
    ...target
  }: CheckInActionProps = $props();

  const { isCheckingIn, canCheckIn, checkin, isWatchable } = $derived(
    useCheckIn(target),
  );
</script>

{#if isWatchable}
  <CheckInButton
    {style}
    {title}
    {size}
    {checkin}
    canCheckIn={$canCheckIn}
    isCheckingIn={$isCheckingIn}
  />
{/if}
