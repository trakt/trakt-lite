<script lang="ts">
  import CardCover from "$lib/components/card/CardCover.svelte";
  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Link from "$lib/components/link/Link.svelte";
  import LandscapeCard from "$lib/components/media/card/LandscapeCard.svelte";
  import CrossOriginImage from "$lib/features/image/components/CrossOriginImage.svelte";
  import type { UserProfile } from "$lib/requests/models/UserProfile";
  import { DEFAULT_COVER } from "$lib/utils/constants";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";

  const { profile }: { profile: UserProfile } = $props();
</script>

<LandscapeCard>
  <div class="profile-card" class:has-default-cover={!profile.cover?.url}>
    <Link focusable={false} href={UrlBuilder.profile.user(profile.slug ?? "")}>
      <CardCover
        title="TODO"
        src={profile.cover?.url ?? DEFAULT_COVER}
        alt="TODO"
      />
    </Link>

    <CrossOriginImage
      classList="trakt-profile-avatar"
      animate={false}
      src={profile.avatar.url}
      alt="TODO"
    />

    <CardFooter>
      <p class="meta-info ellipsis">{profile.username} - {profile.name.full}</p>
    </CardFooter>
  </div>
</LandscapeCard>

<style>
  .profile-card {
    position: relative;

    :global(.trakt-card-cover) {
      filter: grayscale(75%);
    }

    &.has-default-cover {
      :global(.trakt-card-cover) {
        filter: grayscale(100%);
      }
    }

    :global(.trakt-profile-avatar) {
      width: var(--ni-96);
      height: var(--ni-96);

      border-radius: 50%;

      position: absolute;
      top: calc(var(--height-landscape-card-cover) / 2 - var(--ni-48));
      left: calc(50% - var(--ni-48));

      border: 2px solid white;
      box-sizing: border-box;
      box-shadow: var(--ni-0) var(--ni-8) var(--ni-8) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 25%, transparent 75%);
    }
  }
</style>
