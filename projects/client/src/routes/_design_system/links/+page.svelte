<script>
  import { page } from "$app/state";
  import ActionButton from "$lib/components/buttons/ActionButton.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import WatchNowIcon from "$lib/components/icons/WatchNowIcon.svelte";
  import Link from "$lib/components/link/Link.svelte";

  const EXTERNAL_LINK = "https://trakt.tv";
</script>

<main>
  <h1>Links</h1>

  <div class="link-display">
    <section>
      <h2>External</h2>
      <Link href={EXTERNAL_LINK} target="_blank">Trakt.tv</Link>

      <Button
        href={EXTERNAL_LINK}
        target="_blank"
        label="This is the primary textured link"
        style="textured"
        color="purple"
      >
        Textured Icon
        {#snippet icon()}
          <WatchNowIcon />
        {/snippet}
      </Button>

      <Button
        href={EXTERNAL_LINK}
        target="_blank"
        label="This is the primary textured link"
        style="flat"
        color="purple"
      >
        Flat primary
      </Button>

      <Button
        href={EXTERNAL_LINK}
        target="_blank"
        label="This is the primary textured link in a disabled"
        style="ghost"
        color="purple"
      >
        Ghost primary
      </Button>

      <div class="action-link-variants">
        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link"
          color="purple"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link"
          color="blue"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link in a disabled"
          color="red"
        >
          <WatchNowIcon />
        </ActionButton>
      </div>
    </section>

    <section>
      <h2>Active</h2>
      <Link href={page.url.pathname} target="_blank">Trakt.tv</Link>

      <Button
        href={page.url.pathname}
        target="_blank"
        label="This is the primary textured link"
        style="textured"
        color="purple"
      >
        Textured Icon
        {#snippet icon()}
          <WatchNowIcon />
        {/snippet}
      </Button>

      <Button
        href={page.url.pathname}
        target="_blank"
        label="This is the primary textured link"
        style="flat"
        color="purple"
      >
        Flat primary
      </Button>

      <Button
        href={page.url.pathname}
        target="_blank"
        label="This is the primary textured link in a disabled"
        style="ghost"
        color="purple"
      >
        Ghost primary
      </Button>

      <div class="action-link-variants">
        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link"
          color="purple"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link"
          color="blue"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href={page.url.pathname}
          target="_blank"
          label="This is the primary textured link in a disabled"
          color="red"
        >
          <WatchNowIcon />
        </ActionButton>
      </div>
    </section>

    <section>
      <h2>Inactive</h2>
      <Link href="/" target="_blank">Trakt.tv</Link>

      <Button
        href="/"
        color="purple"
        target="_blank"
        label="This is the primary textured link"
        style="textured"
      >
        Textured Icon
        {#snippet icon()}
          <WatchNowIcon />
        {/snippet}
      </Button>

      <Button
        href="/"
        color="purple"
        target="_blank"
        label="This is the primary textured link"
        style="flat"
      >
        Flat primary
      </Button>

      <Button
        href="/"
        color="purple"
        target="_blank"
        label="This is the primary textured link in a disabled"
        style="ghost"
      >
        Ghost primary
      </Button>

      <div class="action-link-variants">
        <ActionButton
          href="/"
          target="_blank"
          label="This is the primary textured link"
          color="purple"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href="/"
          target="_blank"
          label="This is the primary textured link"
          color="blue"
        >
          <WatchNowIcon />
        </ActionButton>

        <ActionButton
          href="/"
          target="_blank"
          label="This is the primary textured link in a disabled"
          color="red"
        >
          <WatchNowIcon />
        </ActionButton>
      </div>
    </section>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--gap-xl);
    padding-top: var(--ni-32);
    align-items: center;

    .link-display {
      display: flex;
      justify-content: space-between;

      width: 75%;

      section {
        display: flex;
        flex-direction: column;
        gap: var(--gap-m);
        align-items: center;
      }
    }

    .action-link-variants {
      display: flex;
      gap: var(--gap-m);
    }
  }
</style>
