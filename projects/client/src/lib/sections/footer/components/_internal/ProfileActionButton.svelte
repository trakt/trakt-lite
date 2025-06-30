<script lang="ts">
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import LogoutButton from "./LogoutButton.svelte";

  const { size }: { size: "small" | "tag" } = $props();
</script>

<!-- TODO also settings when non sidebar -->
<RenderFor navigation="dpad" audience="authenticated">
  <LogoutButton {size} />
</RenderFor>
