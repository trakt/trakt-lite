<script lang="ts">
  import Link from "$lib/components/link/Link.svelte";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import * as m from "$lib/features/i18n/messages.ts";
  import { DpadNavigationType } from "$lib/features/navigation/models/DpadNavigationType";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import ProfileImage from "../profile-banner/ProfileImage.svelte";
  import VipBadge from "./components/VIPBadge.svelte";

  const { user } = useUser();
  const isVip = $derived(!!$user?.isVip);
  const color = $derived(isVip ? "red" : "purple");
  const style = $derived(isVip ? "textured" : "flat");
</script>

<trakt-profile-button data-hj-suppress>
  <Link
    href={UrlBuilder.profile.me()}
    label={m.button_label_user_profile()}
    navigationType={DpadNavigationType.Item}
  >
    <div class="profile-icon">
      <ProfileImage
        --width="var(--ni-32)"
        --height="var(--ni-32)"
        --border-width="var(--border-thickness-xs)"
        name={$user?.name?.first ?? ""}
        src={$user?.avatar?.url ?? ""}
      />
      <RenderFor
        audience="vip"
        device={["tablet-sm", "tablet-lg", "desktop"]}
        navigation="default"
      >
        <VipBadge />
      </RenderFor>
    </div>
  </Link>
  <!-- <Button
    size="small"
    href={UrlBuilder.profile.me()}
    label={m.button_label_user_profile()}
    {color}
    {style}
    navigationType={DpadNavigationType.Item}
  >
    <RenderFor audience="authenticated">
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
          audience="vip"
          device={["tablet-sm", "tablet-lg", "desktop"]}
          navigation="default"
        >
          <VipBadge />
        </RenderFor>
      </div>
    {/snippet}
  </Button> -->
</trakt-profile-button>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  trakt-profile-button {
    @include for-mobile {
      :global(.button-label) {
        display: none;
      }
    }
  }

  .profile-icon {
    display: flex;
    align-items: center;

    :global(.vip-badge) {
      margin-top: var(--ni-neg-24);
      margin-left: var(--ni-neg-12);
      z-index: var(--layer-raised);
    }
  }
</style>
