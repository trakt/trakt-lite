<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import CaretRightIcon from "$lib/components/icons/CaretRightIcon.svelte";
  import { useAuth } from "$lib/features/auth/stores/useAuth";
  import * as m from "$lib/features/i18n/messages";

  const { url } = useAuth();
</script>

<Button
  color="purple"
  href={$url}
  label={m.join_trakt_button_label()}
  style="flat"
>
  {m.join_trakt_for_free_button()}
  {#snippet icon()}
    <CaretRightIcon />
  {/snippet}
</Button>
