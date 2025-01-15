<script lang="ts">
  import * as m from "$lib/features/i18n/messages";

  import ClampedText from "$lib/components/text/ClampedText.svelte";

  type MediaOverviewProps = {
    title: string;
    overview: string;
  };

  const { title, overview }: MediaOverviewProps = $props();
</script>

<ClampedText classList="secondary" label={m.expand_media_overview({ title })}>
  {overview}
</ClampedText>
