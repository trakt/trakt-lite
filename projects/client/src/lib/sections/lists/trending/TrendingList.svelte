<script lang="ts">
  import type { MediaType } from "$lib/requests/models/MediaType";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import DrillableMediaList from "../drilldown/DrillableMediaList.svelte";
  import TrendingListItem from "./TrendingListItem.svelte";
  import { useTrendingList } from "./useTrendingList";

  type TrendingListProps = {
    title: string;
    drilldownLabel: string;
    type: MediaType;
  };

  const { title, drilldownLabel, type }: TrendingListProps = $props();
</script>

<DrillableMediaList
  id="trending-list-{type}"
  {title}
  {drilldownLabel}
  {type}
  useList={useTrendingList}
  urlBuilder={UrlBuilder.trending}
>
  {#snippet item(media)}
    <TrendingListItem {type} {media} />
  {/snippet}
</DrillableMediaList>
