<script lang="ts">
  import { languageTag } from "$lib/features/i18n";
  import * as m from "$lib/features/i18n/messages.ts";
  import type { NowPlayingItem } from "$lib/requests/models/NowPlayingItem";
  import { toHumanDuration } from "$lib/utils/formatting/date/toHumanDuration";
  import { episodeActivityTitle } from "$lib/utils/string/episodeActivityTitle";
  import NowPlayingItemCard from "./NowPlayingItemCard.svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import { useFooterHeight } from "./useFooterHeight";
  import { useNowPlayingProgress } from "./useNowPlayingProgress";
  import { useScrollDistance } from "./useScrollDistance";

  const { nowPlaying }: { nowPlaying: NowPlayingItem } = $props();

  const { isPlaying, remainingMinutes, progress } = $derived(
    useNowPlayingProgress(nowPlaying),
  );

  const { distanceFromBottom } = useScrollDistance();
  const { footerHeight } = useFooterHeight();

  const title = $derived(
    nowPlaying.type === "movie"
      ? nowPlaying.media.title
      : episodeActivityTitle(nowPlaying.episode, nowPlaying.media),
  );
</script>

{#if $isPlaying}
  <div
    class="trakt-now-playing-toast"
    style="--distance-from-bottom: {$distanceFromBottom}px; --footer-height: {$footerHeight}px"
  >
    <NowPlayingItemCard nowPlayingItem={nowPlaying} />
    <div class="trakt-now-playing-content">
      <span class="trakt-now-playing-label">{m.now_playing()}</span>
      <div class="trakt-now-playing-status">
        <h5 class="trakt-now-playing-title ellipsis">
          {title}
        </h5>
        <div class="trakt-now-playing-remaining">
          <span class="meta-info">
            {toHumanDuration({ minutes: $remainingMinutes }, languageTag())}
          </span>
          <span class="meta-info">{m.remaining()}</span>
        </div>
      </div>
      <ProgressBar progress={$progress} />
    </div>
  </div>
{/if}

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-now-playing-toast {
    --now-playing-padding: var(--ni-12);
    --now-playing-gap: var(--gap-m);
    --now-playing-bottom-distance: var(--ni-24);
    --now-playing-height: calc(
      var(--height-now-playing-card) + 2 * var(--now-playing-padding)
    );
    --now-playing-footer-top: var(--footer-height) - var(--footer-bar-padding);
    --now-playing-footer-offset: var(--now-playing-footer-top) - var(
        --now-playing-height
      );

    position: fixed;
    z-index: var(--layer-overlay);

    border-radius: var(--border-radius-l);

    box-sizing: border-box;
    padding: var(--now-playing-padding);

    height: var(--now-playing-height);
    width: min(var(--ni-480), 90dvw);

    bottom: max(
      var(--now-playing-bottom-distance),
      var(--now-playing-footer-offset) - var(--distance-from-bottom)
    );
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    align-items: center;
    gap: var(--now-playing-gap);

    box-shadow: var(--ni-0) var(--ni-8) var(--ni-8) var(--ni-0)
      color-mix(in srgb, var(--color-shadow) 25%, transparent 75%);

    background-color: var(--color-now-playing-background);
    border: var(--border-thickness-xxs) solid var(--color-now-playing-border);

    transition: var(--transition-increment) ease-in-out;
    transition-property: padding, gap;

    @include backdrop-filter-blur(var(--ni-16));

    @include for-tablet-sm-and-below {
      --now-playing-bottom-distance: calc(
        var(--ni-12) + var(--mobile-navbar-height)
      );
      --now-playing-footer-offset: calc(
        var(--mobile-navbar-height) + var(--footer-height)
      );
    }

    @include for-mobile {
      --now-playing-padding: var(--ni-10);
      --now-playing-gap: var(--gap-s);
    }
  }

  .trakt-now-playing-content {
    flex: 1;
    padding-top: var(--ni-8);
    height: calc(100% - var(--ni-8));

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: var(--gap-xxs);
    max-width: calc(
      100% - var(--now-playing-gap) - var(--width-now-playing-card)
    );

    .trakt-now-playing-label,
    .trakt-now-playing-title {
      transition: font-size var(--transition-increment) ease-in-out;
    }

    @include for-mobile {
      .trakt-now-playing-label {
        font-size: var(--ni-14);
      }

      .trakt-now-playing-title {
        font-size: var(--ni-16);
      }
    }
  }

  .trakt-now-playing-remaining {
    display: flex;
    align-items: center;

    gap: var(--gap-xxs);

    @include for-mobile {
      flex-direction: column;
      align-items: flex-end;

      gap: 0;
    }
  }

  .trakt-now-playing-status {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @include for-mobile {
      align-items: center;
    }
  }
</style>
