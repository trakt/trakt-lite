<script lang="ts">
  import PlayIcon from "$lib/components/icons/PlayIcon.svelte";
  import WatchNowServiceLogo from "$lib/components/media/watch-now/WatchNowServiceLogo.svelte";
  import { WatchNowServiceLogoIntlProvider } from "$lib/components/media/watch-now/WatchNowServiceLogoIntlProvider";
  import * as m from "$lib/features/i18n/messages";
  import type { WatchNowStreaming } from "$lib/requests/models/WatchNowServices";

  const {
    service,
  }: {
    service?: WatchNowStreaming;
  } = $props();
</script>

{#if service}
  <div class="trakt-watch-now-overlay">
    <div class="trakt-watch-now-source">
      <h6 class="uppercase">{m.stream_on()}</h6>
      <WatchNowServiceLogo
        source={service.source}
        i18n={WatchNowServiceLogoIntlProvider}
      />
    </div>
    <div class="trakt-watch-now-play">
      <PlayIcon />
    </div>
  </div>
{/if}

<style>
  .trakt-watch-now-overlay {
    --source-shadow: var(--ni-2) var(--ni-2) var(--ni-4)
      var(--color-background-purple);

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }

  .trakt-watch-now-source {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    gap: var(--gap-xs);
    text-shadow: var(--source-shadow);
    padding: var(--ni-8);

    :global(.trakt-watch-now-service-logo img) {
      filter: drop-shadow(var(--source-shadow));
      height: var(--ni-40);
      width: auto;
    }
  }

  .trakt-watch-now-play {
    border-radius: 50%;
    background-color: var(--color-background-purple);
    padding: var(--ni-16);
    width: var(--ni-56);
    height: var(--ni-56);

    :global(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>
