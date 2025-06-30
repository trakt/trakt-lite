<script lang="ts">
  import { browser } from "$app/environment";
  import { TestId } from "$e2e/models/TestId";
  import Button from "$lib/components/buttons/Button.svelte";
  import GearIcon from "$lib/components/icons/GearIcon.svelte";
  import HomeIcon from "$lib/components/icons/mobile/HomeIcon.svelte";
  import WatchlistIcon from "$lib/components/icons/mobile/WatchlistIcon.svelte";
  import MovieIcon from "$lib/components/icons/MovieIcon.svelte";
  import ShowIcon from "$lib/components/icons/ShowIcon.svelte";
  import * as m from "$lib/features/i18n/messages";
  import { DpadNavigationType } from "$lib/features/navigation/models/DpadNavigationType";
  import SearchIcon from "$lib/features/search/SearchIcon.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { getDeviceType } from "$lib/utils/devices/getDeviceType";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import BetaBadge from "./components/BetaBadge.svelte";
  import FilterButton from "./components/filter/FilterButton.svelte";
  import TraktLogo from "./components/TraktLogo.svelte";
  import TraktTagline from "./components/TraktTagline.svelte";
  import ProfileLink from "./ProfileLink.svelte";

  const isTV = $derived(browser && getDeviceType(navigator.userAgent) === "tv");

  /*
    TODO:

    -Layout fixes/changes (side distances)
    -New profile button
    -VIP upsell badge
   */
</script>

<header>
  <nav
    class="trakt-side-navbar"
    data-dpad-navigation={DpadNavigationType.Navbar}
  >
    <div class="trakt-side-navbar-top">
      <TraktLogo />
      {#if isTV}
        <BetaBadge />
      {/if}
      <TraktTagline />
    </div>

    <div class="trakt-side-navbar-content">
      <RenderFor audience="authenticated" navigation="default">
        <Button
          href={UrlBuilder.search()}
          label="SEARCH"
          style="flat"
          variant="secondary"
          color="purple"
        >
          Search
          {#snippet icon()}
            <SearchIcon />
          {/snippet}
        </Button>
      </RenderFor>

      <Button
        href={UrlBuilder.home()}
        label={m.button_label_home()}
        style="flat"
        variant="secondary"
        color="purple"
        data-testid={TestId.NavBarHomeButton}
        navigationType={DpadNavigationType.Item}
      >
        {m.button_text_home()}
        {#snippet icon()}
          <HomeIcon />
        {/snippet}
      </Button>

      <Button
        href={UrlBuilder.shows()}
        label={m.button_label_browse_shows()}
        style="flat"
        variant="secondary"
        color="purple"
        data-testid={TestId.NavBarShowsButton}
        navigationType={DpadNavigationType.Item}
      >
        {m.button_text_browse_shows()}
        {#snippet icon()}
          <ShowIcon />
        {/snippet}
      </Button>
      <Button
        href={UrlBuilder.movies()}
        label={m.button_label_browse_movies()}
        style="flat"
        variant="secondary"
        color="purple"
        data-testid={TestId.NavBarMoviesButton}
        navigationType={DpadNavigationType.Item}
      >
        {m.button_text_browse_movies()}
        {#snippet icon()}
          <MovieIcon />
        {/snippet}
      </Button>

      <RenderFor audience="authenticated">
        <Button
          href={UrlBuilder.lists.user()}
          label={m.button_label_browse_lists()}
          style="flat"
          variant="secondary"
          color="purple"
          navigationType={DpadNavigationType.Item}
        >
          {m.button_text_browse_lists()}
          {#snippet icon()}
            <WatchlistIcon />
          {/snippet}
        </Button>
        <Button
          href={UrlBuilder.settings()}
          label={m.button_label_settings()}
          style="flat"
          variant="secondary"
          color="purple"
          navigationType={DpadNavigationType.Item}
        >
          {m.button_text_settings()}
          {#snippet icon()}
            <GearIcon />
          {/snippet}
        </Button>
      </RenderFor>
    </div>

    <div class="trakt-side-navbar-bottom">
      <RenderFor audience="authenticated">
        <FilterButton size="normal" />
        <ProfileLink />
      </RenderFor>
    </div>
  </nav>
</header>

<style>
  header {
    --navbar-width: var(--ni-66);
    --navbar-item-width: var(--ni-32);
    --navbar-margin: var(--ni-12);
    --navbar-margin-top: calc(var(--navbar-margin) + env(safe-area-inset-top));
    --navbar-margin-bottom: calc(
      var(--navbar-margin) + env(safe-area-inset-bottom)
    );
    --navbar-padding: calc(
      (var(--navbar-width) - var(--navbar-item-width)) / 2
    );
  }

  .trakt-side-navbar {
    z-index: var(--layer-overlay);
    position: fixed;
    top: 0;
    left: 0;

    width: var(--navbar-width);
    min-width: var(--navbar-width);
    height: calc(
      100dvh - var(--navbar-margin-top) - var(--navbar-margin-bottom)
    );

    background-color: var(--color-background-navbar);
    box-shadow: 0px 24px 64px 0px
      color-mix(in srgb, var(--color-shadow) 32%, transparent 68%);

    backdrop-filter: blur(8px);
    color: var(--color-foreground-navbar);

    margin: var(--navbar-margin);
    margin-top: var(--navbar-margin-top);
    margin-bottom: var(--navbar-margin-bottom);
    padding: var(--navbar-padding);
    box-sizing: border-box;

    border-radius: var(--border-radius-l);
    transition: var(--transition-increment) cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: min-width, background-color, box-shadow;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-m);

    overflow: hidden;

    &:has(:global(*):focus-visible),
    &:hover {
      width: fit-content;

      &,
      .trakt-side-navbar-content {
        min-width: var(--ni-200);
      }

      :global(.trakt-tagline) {
        opacity: 1;
      }

      :global(.trakt-button) {
        &:global(.trakt-link-active) {
          color: var(--color-foreground-button);
          background-color: var(--color-background-button);
        }

        &:focus-visible {
          outline: var(--border-thickness-xs) solid
            var(--color-background-button);
        }

        :global(.button-label) {
          opacity: 1;
        }
      }
    }

    /* TODO: show label in opened state */
    :global(trakt-profile-button) {
      :global(.button-label) {
        display: none;
      }
    }

    :global(.trakt-button) {
      flex-direction: row-reverse;
      min-width: var(--ni-200);
      margin-left: var(--ni-neg-12);

      gap: var(--gap-l);

      color: var(--color-text-secondary);
      background: none;

      transition: var(--transition-increment) ease-in-out;
      transition-property: background-color, color;

      :global(.trakt-icon-filter-filtered) {
        fill: var(--blue-500);
      }

      &:global(.trakt-link-active .button-icon) {
        color: var(--color-foreground-button);
      }

      :global(.button-label) {
        flex: 1;
        opacity: 0;
        transition: opacity var(--transition-increment) ease-in-out;
      }

      &:hover {
        color: var(--color-foreground-button);
        background-color: var(--color-background-button);
      }
    }
  }

  .trakt-side-navbar-top,
  .trakt-side-navbar-content,
  .trakt-side-navbar-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .trakt-side-navbar-top {
    color: var(--color-foreground);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--gap-m);

    :global(.trakt-tagline) {
      opacity: 0;
      transition: opacity var(--transition-increment) ease-in-out;
    }
  }

  .trakt-side-navbar-bottom {
    gap: var(--gap-m);
  }

  .trakt-side-navbar-content {
    gap: var(--gap-xs);
  }
</style>
