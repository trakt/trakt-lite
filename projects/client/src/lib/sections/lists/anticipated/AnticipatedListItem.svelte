<script lang="ts">
  import AnticipatedTag from "$lib/components/media/tags/AnticipatedTag.svelte";
  import { TagIntlProvider } from "$lib/components/media/tags/TagIntlProvider";
  import DefaultMediaItem from "../components/DefaultMediaItem.svelte";
  import type { MediaCardProps } from "../components/MediaCardProps";
  import type { AnticipatedEntry } from "./useAnticipatedList";

  const { type, media, style }: MediaCardProps<AnticipatedEntry> = $props();
</script>

{#snippet tag()}
  <AnticipatedTag i18n={TagIntlProvider} score={media.score} />
{/snippet}

<DefaultMediaItem {type} {media} {tag} {style} />
