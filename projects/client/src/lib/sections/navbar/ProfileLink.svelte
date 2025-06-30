<script lang="ts">
  import Link from "$lib/components/link/Link.svelte";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import * as m from "$lib/features/i18n/messages.ts";
  import { DpadNavigationType } from "$lib/features/navigation/models/DpadNavigationType";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import ProfileImage from "../profile-banner/ProfileImage.svelte";
  import VipBadge from "./components/VIPTempBadge.svelte";

  const { user } = useUser();
  // TODO reuse button and increase icon size?
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
    <div class="profile-info">
      <p class="profile-name">{$user?.name?.first}</p>
      <p class="meta-info">view profile</p>
    </div>
  </Link>
</trakt-profile-button>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  trakt-profile-button {
    :global(.trakt-link) {
      display: flex;
      align-items: center;
      gap: var(--gap-s);

      text-decoration: none;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: column;

    .profile-name {
      line-height: 150%;
    }

    .meta-info {
      line-height: 90%;
      color: var(--color-text-secondary);
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
