<script>
  import * as m from "$lib/features/i18n/messages";

  import TrendingPageList from "$lib/sections/lists/TrendingPageList.svelte";
</script>

<TrendingPageList title={m.trending_shows()} type="show" />
