<script lang="ts">
  import { useUser } from "$lib/features/auth/stores/useUser";
  import { frameListener } from "./_internal/frameListener";

  type FrameProps = {
    slug: string;
    title: string;
    urlBuilder: (slug: string, token: string | Nil) => HttpsUrl;
  };

  const { slug: userSlug, title, urlBuilder }: FrameProps = $props();

  const { user } = useUser();

  const isMe = $derived(userSlug === "me" || userSlug === $user.slug);
  const slug = $derived(isMe ? $user.slug : userSlug);
  const token = $derived(isMe ? $user.token : null);
</script>

<iframe
  class="trakt-og-frame"
  {title}
  src={urlBuilder(slug, token)}
  use:frameListener={slug}
></iframe>

<style>
  iframe {
    height: 100dvh;
    border: none;
    overflow: hidden;

    /* TODO fix overflow */
    width: calc(
      100dvw - (var(--layout-distance-side) + var(--side-navbar-width))
    );
    margin-left: calc(var(--layout-distance-side) + var(--side-navbar-width));
  }
</style>
