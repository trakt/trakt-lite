<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import { useAuth } from "$lib/features/auth/stores/useAuth";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import * as m from "$lib/features/i18n/messages.ts";
  import { KbNavigationType } from "$lib/features/kb-navigation/models/KbNavigationType";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import ProfileImage from "../profile-banner/ProfileImage.svelte";
  import GetVIPLink from "./components/GetVIPLink.svelte";
  import VipBadge from "./components/VIPBadge.svelte";

  const { user } = useUser();
  const { logout } = useAuth();
  const isVip = $derived(!!$user?.isVip);
  const color = $derived(isVip ? "red" : "purple");
  const style = $derived(isVip ? "textured" : "flat");
</script>

{#if !isVip}
  <GetVIPLink />
{/if}

<!-- TODO non dropdown for androidtv -->
<Button
  href={UrlBuilder.profile.me()}
  label={m.user_menu_toggle_label()}
  variant="primary"
  text="capitalize"
  size="small"
  {style}
  {color}
  navigationType={KbNavigationType.Item}
>
  <RenderFor audience="authenticated" device={["desktop"]}>
    {$user?.name?.first}
  </RenderFor>
  {#snippet icon()}
    <div class="profile-icon">
      <ProfileImage
        --width="var(--ni-16)"
        --height="var(--ni-16)"
        --border-width="var(--border-thickness-xs)"
        name={$user?.name?.first ?? ""}
        src={$user?.avatar?.url ?? ""}
      />
      <RenderFor
        audience="authenticated"
        device={["tablet-sm", "tablet-lg", "desktop"]}
      >
        {#if isVip}
          <VipBadge />
        {/if}
      </RenderFor>
    </div>
  {/snippet}
</Button>

<!-- <DropdownList
  label={m.user_menu_toggle_label()}
  variant="primary"
  text="capitalize"
  size="small"
  {style}
  {color}
>
  <RenderFor audience="authenticated" device={["desktop"]}>
    {$user?.name?.first}
  </RenderFor>
  {#snippet icon()}
    <div class="profile-icon">
      <ProfileImage
        --width="var(--ni-16)"
        --height="var(--ni-16)"
        --border-width="var(--border-thickness-xs)"
        name={$user?.name?.first ?? ""}
        src={$user?.avatar?.url ?? ""}
      />
      <RenderFor
        audience="authenticated"
        device={["tablet-sm", "tablet-lg", "desktop"]}
      >
        {#if isVip}
          <VipBadge />
        {/if}
      </RenderFor>
    </div>
  {/snippet}
  {#snippet items()}
    <DropdownItem href={UrlBuilder.profile.me()}>
      {m.profile()}
    </DropdownItem>
    <DropdownItem color="red" onclick={logout}>
      {m.logout()}
    </DropdownItem>
  {/snippet}
</DropdownList> -->

<style>
  :global(.trakt-navbar .trakt-profile-button) {
    display: flex;
    align-items: center;
    gap: var(--gap-xs);
  }

  :global(.trakt-navbar .trakt-profile-button .profile-image) {
    width: var(--ni-32);
    height: var(--ni-32);
  }

  .profile-icon {
    display: flex;
    align-items: center;

    :global(.vip-badge) {
      margin-left: var(--ni-neg-8);
      z-index: var(--layer-raised);
    }
  }
</style>
