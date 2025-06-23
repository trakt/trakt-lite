<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import CaretRightIcon from "$lib/components/icons/CaretRightIcon.svelte";
  import * as m from "$lib/features/i18n/messages";
  import { DpadNavigationType } from "$lib/features/navigation/models/DpadNavigationType";
  import { useLoginTarget } from "$lib/sections/navbar/components/useLoginTarget";

  const { target } = useLoginTarget();
</script>

<Button
  color="purple"
  label={m.join_trakt_button_label()}
  style="flat"
  navigationType={DpadNavigationType.Item}
  {...$target}
>
  {m.join_trakt_for_free_button()}
  {#snippet icon()}
    <CaretRightIcon />
  {/snippet}
</Button>
