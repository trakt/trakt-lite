<script lang="ts">
  import PageList from "$lib/components/lists/page-list/PageList.svelte";
  import { TagIntlProvider } from "$lib/components/media/tags/TagIntlProvider";
  import WatchersTag from "$lib/components/media/tags/WatchersTag.svelte";
  import type { MediaType } from "$lib/models/MediaType";
  import MediaItem from "./components/MediaItem.svelte";
  import { useTrendingList } from "./stores/useTrendingList";
  import { mediaCardWidthResolver } from "./utils/mediaCardWidthResolver";

  type TrendingListProps = {
    title: string;
    type: MediaType;
  };

  const { title, type }: TrendingListProps = $props();

  const { list } = useTrendingList({ type });
</script>

<PageList {title} items={$list} --width-item={mediaCardWidthResolver(type)}>
  {#snippet item(media)}
    <MediaItem {type} {media}>
      {#snippet tags()}
        <WatchersTag i18n={TagIntlProvider} watchers={media.watchers} />
      {/snippet}
    </MediaItem>
  {/snippet}
</PageList>
