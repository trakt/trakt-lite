<script lang="ts">
  import type { QuickFilters } from "$lib/features/filters/QuickFilters";
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

  const testFilters: QuickFilters = {
    onReset: () => {
      console.log("reset");
    },
    filters: [
      {
        label: "genre",
        values: [
          { id: "1", label: "action" },
          { id: "2", label: "comedy" },
        ],
        onFilter: (value) => {
          console.log("filtering", value);
        },
      },
      {
        label: "status",
        values: [
          { id: "1", label: "watched" },
          { id: "2", label: "unwatched" },
        ],
        onFilter: (value) => {
          console.log("filtering", value);
        },
      },
    ],
  };
</script>

<DrillableMediaList
  id="trending-list-{type}"
  {title}
  {drilldownLabel}
  {type}
  filters={testFilters}
  useList={useTrendingList}
  urlBuilder={UrlBuilder.trending}
>
  {#snippet item(media)}
    <TrendingListItem {type} {media} />
  {/snippet}
</DrillableMediaList>
