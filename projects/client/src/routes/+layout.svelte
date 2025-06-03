<script lang="ts">
  import "../style";

  import { DeploymentEndpoint } from "$lib/features/deployment/DeploymentEndpoint.js";
  import { isPWA } from "$lib/utils/devices/isPWA.ts";
  import { WorkerMessage } from "$worker/WorkerMessage";
  import { workerRequest } from "$worker/workerRequest";
  import { onMount } from "svelte";
  import FirefoxBlurHack from "./_internal/FirefoxBlurHack.svelte";

  const { data, children } = $props();

  onMount(async () => {
    if (isPWA()) {
      document.body.classList.add("trakt-pwa");
    }

    const ACTIVE_SHA = TRAKT_GIT_SHA;
    const DEPLOYED_SHA = await fetch(DeploymentEndpoint.Get).then((res) =>
      res.text(),
    );

    if (ACTIVE_SHA === DEPLOYED_SHA) {
      return;
    }

    await workerRequest(WorkerMessage.CacheBust);
  });
</script>

<svelte:head>
  <title>Trakt Lite</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    rel="preconnect"
    href="https://walter-r2.trakt.tv"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300..700&display=swap"
    rel="stylesheet"
  />
  <style>
    html,
    body {
      margin: 0;
      padding: 0;

      width: 100%;
      height: -moz-available;
      height: -webkit-fill-available;
      height: fill-available;
    }

    html::before {
      content: "";
      height: 100vh;
      width: 100vw;
      z-index: calc(var(--layer-background) - 1);

      display: block;
      position: fixed;

      background-color: var(--color-background);
    }

    body {
      background-color: var(--color-background);
      color: var(--color-foreground);
      font-family: "Spline Sans", Arial, sans-serif;
    }

    body:has(dialog[open]),
    body.dialog-open {
      overflow: hidden;
    }

    body:has(.trakt-side-navbar) {
      --layout-sidebar-distance: calc(var(--side-navbar-width) + var(--ni-16));
    }
  </style>
</svelte:head>

<a href="https://www.netflix.com/watch/80013762"> NETFLIX TEST </a>
<a href="https://www.youtube.com/watch?v=o-YBDTqX_ZU"> YOUTUBE TEST </a>
<button
  onclick={() =>
    streamOnWebOs("netflix", "https://www.netflix.com/watch/80013762")}
  >CLICKME</button
>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  :global(.tsqd-open-btn-container) {
    opacity: 0.25;
  }

  .trakt-layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .trakt-layout-content {
    flex: 1;

    padding-left: var(--layout-sidebar-distance);
    box-sizing: border-box;
  }

  @include for-mouse {
    :global(::-webkit-scrollbar) {
      width: var(--ni-8);
      height: var(--ni-8);
    }

    :global(body),
    :global(html) {
      &::-webkit-scrollbar-thumb {
        background-color: color-mix(
          in srgb,
          var(--color-foreground) 30%,
          transparent 70%
        );
      }
    }

    :global(::-webkit-scrollbar-thumb) {
      background-color: color-mix(
        in srgb,
        var(--color-foreground) 0%,
        transparent 100%
      );
      border-radius: var(--border-radius-xs);
      opacity: 0;

      @include backdrop-filter-blur(var(--ni-4));
    }

    :global(:hover::-webkit-scrollbar-thumb) {
      background-color: color-mix(
        in srgb,
        var(--color-foreground) 50%,
        transparent 50%
      );
    }

    :global(::-webkit-scrollbar-thumb:hover) {
      background-color: color-mix(
        in srgb,
        var(--color-foreground) 100%,
        transparent 0%
      );
    }
  }

  @mixin pwa-navbar-shadow($position) {
    content: "";
    z-index: var(--layer-floating);
    pointer-events: none;

    position: $position;
    top: 0;

    width: 100%;
    height: var(--ni-48);

    background: linear-gradient(
      180deg,
      var(--color-background-navbar-base) 0%,
      var(--color-background-navbar-base) 10%,
      transparent 100%
    );
  }

  :global([data-mobile-os="android"] body.trakt-pwa) {
    &::after {
      @include pwa-navbar-shadow(fixed);
    }
  }

  :global([data-mobile-os="ios"]:has(body.trakt-pwa)),
  :global([data-mobile-os="ios"] body.trakt-pwa) {
    overscroll-behavior-y: none;
  }
</style>
