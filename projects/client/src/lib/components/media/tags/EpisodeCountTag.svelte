<script lang="ts">
  import StemTag from "$lib/components/tags/StemTag.svelte";
  import type { TagIntl } from "./TagIntl";

  const {
    count,
    i18n,
  }: {
    count: number;
    i18n: TagIntl;
  } = $props();
</script>

<StemTag>
  <p class="meta-info capitalize no-wrap">
    {i18n.toEpisodeCount(count)}
  </p>
</StemTag>
