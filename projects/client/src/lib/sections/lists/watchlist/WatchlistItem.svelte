<script lang="ts">
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import type { MediaInputDefault } from "$lib/models/MediaInput";
  import MarkAsWatchedAction from "$lib/sections/media-actions/mark-as-watched/MarkAsWatchedAction.svelte";
  import DefaultMediaItem from "../components/DefaultMediaItem.svelte";
  import type { MediaCardProps } from "../components/MediaCardProps";

  const { type, media, style }: MediaCardProps<MediaInputDefault> = $props();
</script>

{#snippet action()}
  <RenderFor audience="authenticated">
    <MarkAsWatchedAction
      style="action"
      size="small"
      title={media.title}
      type={media.type}
      {media}
    />
  </RenderFor>
{/snippet}

<DefaultMediaItem
  {type}
  {media}
  {style}
  action={media.status === "released" ? action : undefined}
/>
