<script lang="ts">
  import * as m from "$lib/features/i18n/messages";

  import { page } from "$app/state";
  import CoverImageSetter from "$lib/components/background/CoverImageSetter.svelte";
  import SectionList from "$lib/components/lists/section-list/SectionList.svelte";
  import InfoTag from "$lib/components/media/tags/InfoTag.svelte";
  import { useSearch } from "$lib/features/search/useSearch";
  import TraktPage from "$lib/sections/layout/TraktPage.svelte";
  import TraktPageCoverSetter from "$lib/sections/layout/TraktPageCoverSetter.svelte";
  import DefaultMediaItem from "$lib/sections/lists/components/DefaultMediaItem.svelte";
  import { mediaListHeightResolver } from "$lib/sections/lists/utils/mediaListHeightResolver";
  import { DEFAULT_SHARE_COVER } from "$lib/utils/constants";
  import { toTranslatedValue } from "$lib/utils/formatting/string/toTranslatedValue";

  const query = $derived(page.url.searchParams.get("q")?.trim());

  const {
    search: searchMovies,
    clear: clearMovies,
    results: movies,
  } = useSearch("movie");

  const {
    search: searchShows,
    clear: clearShows,
    results: shows,
  } = useSearch("show");

  $effect(() => {
    if (!query) {
      clearMovies();
      clearShows();
      return;
    }

    searchMovies(query);
    searchShows(query);
  });

  const first = $derived($shows.at(0) ?? $movies.at(0));
</script>

{#if query}
  <TraktPage
    audience="all"
    image={DEFAULT_SHARE_COVER}
    title={m.results_for_title({ query })}
  >
    {#if first}
      <CoverImageSetter src={first.cover.url.medium} type={first.type} />
    {:else}
      <TraktPageCoverSetter />
    {/if}

    <SectionList
      id="search-grid-list-movies"
      title={m.results_for_title({ query: m.type_movie() })}
      items={$movies}
      --height-list={mediaListHeightResolver("portrait")}
    >
      {#snippet item(result)}
        <DefaultMediaItem type={result.type} media={result} style="cover" />
      {/snippet}
    </SectionList>

    <SectionList
      id="search-grid-list-shows"
      title={m.results_for_title({ query: m.type_show() })}
      items={$shows}
      --height-list={mediaListHeightResolver("portrait")}
    >
      {#snippet item(result)}
        <DefaultMediaItem type={result.type} media={result} style="cover">
          {#snippet tag()}
            <InfoTag>
              {toTranslatedValue("type", result.type)}
            </InfoTag>
          {/snippet}
        </DefaultMediaItem>
      {/snippet}
    </SectionList>
  </TraktPage>
{/if}
