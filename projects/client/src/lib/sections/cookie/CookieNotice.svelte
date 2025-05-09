<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import Link from "$lib/components/link/Link.svelte";
  import { CookieConsentEndpoint } from "$lib/features/cookie-consent/CookieConsentEndpoint";
  import * as m from "$lib/features/i18n/messages.ts";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";

  const { hasConsent }: { hasConsent: boolean } = $props();

  const showCookieNotice = writable(!hasConsent);

  const consent = async () => {
    await fetch(CookieConsentEndpoint.Consent, { method: "PUT" });
    showCookieNotice.set(false);
  };
</script>

{#if $showCookieNotice}
  <div class="trakt-cookie-notice" transition:slide={{ duration: 150 }}>
    <div class="trakt-cookie-notice-text">
      <p class="meta-info">
        {m.cookie_notice()}
        <Link href={UrlBuilder.og.privacy()} target="_blank"
          >{m.cookie_more_info()}</Link
        >
      </p>
    </div>
    <div class="trakt-cookie-notice-actions">
      <Button
        color="default"
        variant="secondary"
        size="small"
        label={m.cookie_accept()}
        onclick={consent}
      >
        {m.cookie_accept()}
      </Button>
    </div>
  </div>
{/if}

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-cookie-notice {
    --cookie-notice-distance-size: var(--layout-distance-side);

    position: fixed;
    z-index: var(--layer-overlay);

    display: flex;
    flex-direction: column;
    gap: var(--gap-s);

    border-radius: var(--border-radius-m);

    box-sizing: border-box;
    padding: var(--ni-12);

    width: var(--ni-320);

    backdrop-filter: blur(var(--ni-16));
    background-color: var(--color-cookie-background);
    border: var(--border-thickness-xxs) solid var(--color-cookie-border);

    bottom: calc(var(--layout-distance-side) + env(safe-area-inset-bottom, 0));
    right: var(--cookie-notice-distance-size);

    transition: var(--transition-increment) ease-in-out;
    transition-property: bottom, right, width;

    @include for-tablet-sm-and-below {
      --cookie-notice-distance-size: var(--ni-8);
      bottom: calc(
        var(--cookie-notice-distance-size) + var(--mobile-navbar-height)
      );
    }

    @include for-mobile {
      width: calc(100% - 2 * var(--cookie-notice-distance-size));
    }
  }

  .trakt-cookie-notice-text p {
    display: inline;
  }
</style>
