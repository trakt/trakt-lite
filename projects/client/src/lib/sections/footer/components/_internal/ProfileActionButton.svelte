<script lang="ts">
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import LogoutButton from "./LogoutButton.svelte";

  const { size }: { size: "small" | "tag" } = $props();
</script>

<RenderFor navigation="dpad" audience="authenticated">
  <LogoutButton {size} />
</RenderFor>
