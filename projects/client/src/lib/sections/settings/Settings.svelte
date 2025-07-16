<script lang="ts">
  import Link from "$lib/components/link/Link.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import LogoutButton from "./_internal/LogoutButton.svelte";

  const { children }: ChildrenProps = $props();
</script>

<RenderFor audience="authenticated">
  <div class="trakt-settings">
    <div class="trakt-settings-sidebar">
      <div class="trakt-settings-sidebar-links">
        <Link href="/settings"><h5 class="uppercase">General</h5></Link>
        <Link href="/settings/advanced">
          <h5 class="uppercase">Advanced</h5>
        </Link>
      </div>
      <div class="trakt-settings-footer">
        <LogoutButton />
      </div>
    </div>
    <div class="trakt-settings-content">
      {@render children()}
    </div>
  </div>
</RenderFor>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-settings {
    display: grid;
    grid-template-columns: var(--ni-300) 1fr;
    gap: var(--gap-s);

    margin: 0 var(--layout-distance-side);

    min-height: var(--ni-120);

    .trakt-settings-content {
      display: flex;
      flex-direction: column;
      gap: var(--gap-xl);

      padding: var(--ni-8);
    }

    @include for-tablet-sm-and-below {
      grid-template-columns: 1fr;
    }
  }

  .trakt-settings-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: var(--gap-l);

    min-height: calc(100dvh - 2 * (var(--gap-m) + env(safe-area-inset-bottom)));

    @include for-tablet-sm-and-below {
      flex-direction: row;
      min-height: auto;

      gap: var(--gap-s);
    }
  }

  .trakt-settings-sidebar-links {
    display: flex;
    flex-direction: column;
    gap: var(--gap-s);

    h5 {
      color: var(--color-text-secondary);
      font-weight: 600;
      transition: font-size var(--transition-increment) ease-in-out;
    }

    :global(.trakt-link) {
      text-decoration: none;
    }

    :global(.trakt-link.trakt-link-active) {
      :global(h5) {
        color: var(--color-text-primary);
        font-size: var(--ni-40);
      }
    }

    @include for-tablet-sm-and-below {
      flex-direction: row;
      align-items: center;

      h5 {
        font-size: var(--ni-18);
      }

      :global(.trakt-link.trakt-link-active) {
        :global(h5) {
          font-size: var(--ni-24);
        }
      }
    }
  }
</style>
