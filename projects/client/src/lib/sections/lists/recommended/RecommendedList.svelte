<script lang="ts">
  import { page } from "$app/state";
  import { useFilter } from "$lib/features/filters/useFilter";
  import type { MediaType } from "$lib/requests/models/MediaType";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import DrillableMediaList from "../drilldown/DrillableMediaList.svelte";
  import { extractWatchWindowParam } from "./extractWatchWindowParam";
  import RecommendedListItem from "./RecommendedListItem.svelte";
  import { useRecommendedList } from "./useRecommendedList";

  type RecommendationListProps = {
    title: string;
    drilldownLabel: string;
    type: MediaType;
    source: "trakt" | "social";
  };

  const { title, drilldownLabel, type, source }: RecommendationListProps =
    $props();
  const { filterMap } = useFilter();
</script>

<DrillableMediaList
  id="recommended-list-{type}-{source}"
  {title}
  {drilldownLabel}
  {type}
  filter={{
    ...$filterMap,
    ...extractWatchWindowParam(page.url.searchParams),
  }}
  useList={(props) => useRecommendedList({ ...props, source })}
  urlBuilder={UrlBuilder.recommended}
>
  {#snippet item(media)}
    <RecommendedListItem {type} {media} />
  {/snippet}
</DrillableMediaList>
