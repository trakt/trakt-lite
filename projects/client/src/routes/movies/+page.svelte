<script lang="ts">
  import * as m from "$lib/features/i18n/messages.ts";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import TraktPage from "$lib/sections/layout/TraktPage.svelte";
  import TraktPageCoverSetter from "$lib/sections/layout/TraktPageCoverSetter.svelte";
  import AnticipatedList from "$lib/sections/lists/anticipated/AnticipatedList.svelte";
  import HotList from "$lib/sections/lists/hot/HotList.svelte";
  import PopularList from "$lib/sections/lists/popular/PopularList.svelte";
  import RecommendedList from "$lib/sections/lists/recommended/RecommendedList.svelte";
  import TrendingList from "$lib/sections/lists/trending/TrendingList.svelte";
  import { DEFAULT_SHARE_MOVIE_COVER } from "$lib/utils/constants";

  const type = "movie";
</script>

<TraktPage
  audience="all"
  image={DEFAULT_SHARE_MOVIE_COVER}
  title={m.navbar_link_movies()}
>
  <TraktPageCoverSetter />

  <TrendingList
    title={m.list_title_trending()}
    drilldownLabel={m.view_all_trending_movies()}
    {type}
  />
  <HotList
    title={m.list_title_hot()}
    drilldownLabel={m.view_all_hot_movies()}
    {type}
  />
  <RenderFor audience="authenticated">
    <RecommendedList
      drilldownLabel={m.view_all_recommended_movies()}
      title={m.list_title_recommendations()}
      {type}
    />
  </RenderFor>
  <AnticipatedList
    drilldownLabel={m.view_all_anticipated_movies()}
    title={m.list_title_most_anticipated()}
    {type}
  />
  <PopularList
    drilldownLabel={m.view_all_popular_movies()}
    title={m.list_title_most_popular()}
    {type}
  />
</TraktPage>
