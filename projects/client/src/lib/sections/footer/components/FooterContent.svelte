<script lang="ts">
  import { page } from "$app/state";
  import LocalePicker from "$lib/features/i18n/components/LocalePicker.svelte";
  import ThemePicker from "$lib/features/theme/components/ThemePicker.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import CopyRight from "./CopyRight.svelte";
  import ExternalLinks from "./ExternalLinks.svelte";
  import FooterBar from "./FooterBar.svelte";
  import FooterLogo from "./FooterLogo.svelte";
  import ProfileActionButton from "./_internal/ProfileActionButton.svelte";

  const isOnProfile = $derived(page.route.id === UrlBuilder.profile.me());
</script>

<div class="trakt-footer-content">
  <RenderFor device={["tablet-lg", "desktop"]} audience="all">
    <FooterBar>
      <FooterLogo />
      {#if isOnProfile}
        <ProfileActionButton size="small" />
      {/if}
    </FooterBar>
  </RenderFor>

  {#if isOnProfile}
    <RenderFor device={["tablet-sm", "mobile"]} audience="authenticated">
      <div class="trakt-footer-logout">
        <FooterBar>
          <ProfileActionButton size="tag" />
        </FooterBar>
      </div>
    </RenderFor>
  {/if}

  <FooterBar>
    <!-- TODO: different layout for smaller (or different component for only theme/lang pickers) -->
    <div class="trakt-footer-left">
      <RenderFor device={["tablet-lg", "desktop"]} audience="all">
        <CopyRight />
      </RenderFor>
      <LocalePicker />
      <ThemePicker />
    </div>
    <div class="trakt-footer-right">
      <RenderFor audience="all" navigation="default">
        <ExternalLinks />
      </RenderFor>
    </div>
  </FooterBar>
</div>

<style>
  .trakt-footer-content {
    height: 100%;
    position: relative;
    display: grid;
    align-content: space-between;
  }

  .trakt-footer-left,
  .trakt-footer-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trakt-footer-logout {
    :global(.trakt-footer-bar) {
      justify-content: flex-end;
    }
  }
</style>
