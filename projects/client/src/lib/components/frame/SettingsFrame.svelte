<script lang="ts">
  import { useUser } from "$lib/features/auth/stores/useUser";
  import { frameListener } from "./_internal/frameListener";

  const { user } = useUser();
</script>

<iframe
  class="trakt-settings-frame"
  title="settings"
  src="http://localhost:3000/settings/data?embedded_mode=true"
  use:frameListener={$user.slug}
></iframe>

<style>
  iframe {
    width: 100%;
    height: fit-content;
    border: none;
    overflow: hidden;
  }
</style>
