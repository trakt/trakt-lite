<script lang="ts">
  import type { MediaType } from "$lib/requests/models/MediaType";
  import { useMedia, WellKnownMediaQuery } from "$lib/stores/css/useMedia";
  import { RECOMMENDED_UPPER_LIMIT } from "$lib/utils/constants";
  import DrilledMediaList from "../drilldown/DrilledMediaList.svelte";
  import RecommendedListItem from "./RecommendedListItem.svelte";
  import { toInMemoryPaginatable } from "./toInMemoryPaginatable";
  import { useRecommendedList } from "./useRecommendedList";

  type RecommendedListProps = {
    title: string;
    type: MediaType;
  };

  const { title, type }: RecommendedListProps = $props();
  const useInMemoryRecommendedList = $derived(
    toInMemoryPaginatable({
      useList: useRecommendedList,
      total: RECOMMENDED_UPPER_LIMIT,
      type,
    }),
  );

  const isMobile = useMedia(WellKnownMediaQuery.mobile);
  const style = $derived($isMobile ? "summary" : "cover");
</script>

<DrilledMediaList
  id="view-all-recommended-${type}"
  {title}
  {type}
  useList={useInMemoryRecommendedList}
>
  {#snippet item(media)}
    <RecommendedListItem {type} {media} {style} />
  {/snippet}
</DrilledMediaList>
