<script lang="ts">
  import CoverImageSetter from "$lib/components/background/CoverImageSetter.svelte";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { DEFAULT_COVER } from "$lib/utils/constants";

  const { user } = useUser();
</script>

<RenderFor audience="authenticated">
  <CoverImageSetter src={$user.cover.url} type="main" />
</RenderFor>
<RenderFor audience="public">
  <CoverImageSetter src={DEFAULT_COVER} type="main" />
</RenderFor>
