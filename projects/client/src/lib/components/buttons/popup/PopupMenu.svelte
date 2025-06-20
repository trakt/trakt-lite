<script lang="ts">
  import MoreIcon from "$lib/components/icons/MoreIcon.svelte";
  import { usePortal } from "$lib/features/portal/usePortal";
  import { disableTransitionOn } from "$lib/utils/actions/disableTransitionOn";
  import { slide } from "svelte/transition";
  import type { PopupMenuProps } from "./PopupMenuProps";

  const { items, ...props }: PopupMenuProps = $props();

  const { portalTrigger, portal, isOpened } = usePortal();
</script>

<button
  use:disableTransitionOn={"touch"}
  use:portalTrigger
  aria-haspopup="true"
  class="trakt-popup-menu-button"
  {...props}
>
  <MoreIcon />
</button>

{#if $isOpened}
  <div
    use:portal
    class="trakt-popup-menu-container"
    transition:slide={{ duration: 150 }}
  >
    <div class="spacer"></div>
    <ul>
      {@render items()}
    </ul>
  </div>
{/if}

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  $button-size: var(--ni-24);
  $button-padding: var(--ni-4);

  .trakt-popup-menu-button {
    all: unset;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: $button-size;
    height: $button-size;
    padding: $button-padding;

    border-radius: var(--border-radius-m);
    color: var(--shade-10);

    transition: var(--transition-increment) ease-in-out;
    transition-property: color, background-color, transform;

    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    :global(svg) {
      transition: transform var(--transition-increment) ease-in-out;
    }

    &:hover,
    &[data-popup-state="opened"] {
      background-color: var(--shade-10);
      color: var(--purple-900);
    }

    @include for-touch {
      &::after {
        position: absolute;
        content: "";
        width: 175%;
        height: 175%;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
      }
    }

    &[data-popup-state="opened"] {
      :global(svg) {
        transform: rotate(90deg);
        animation: rotate-90 var(--transition-increment) ease-in;
      }

      &:global([data-popup-direction="unaligned"]) {
        display: none;
      }
    }
  }

  .trakt-popup-menu-container {
    --list-padding: var(--ni-8);

    min-width: var(--ni-156);
    padding: var(--list-padding);

    border-radius: var(--border-radius-m);
    background-color: var(--shade-10);

    box-shadow:
      var(--ni-0) var(--ni-4) var(--ni-8) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 8%, transparent 92%),
      var(--ni-0) var(--ni-16) var(--ni-16) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 7%, transparent 93%),
      var(--ni-0) var(--ni-32) var(--ni-20) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 4%, transparent 96%),
      var(--ni-0) var(--ni-60) var(--ni-24) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 1%, transparent 99%),
      var(--ni-0) var(--ni-96) var(--ni-32) var(--ni-0)
        color-mix(in srgb, var(--color-shadow) 0%, transparent 100%);

    ul {
      all: unset;

      display: grid;
      gap: var(--gap-xxs);

      :global(li) {
        width: 100%;
        box-sizing: border-box;
      }
    }

    div.spacer {
      height: calc($button-size + $button-padding * 2 + var(--list-padding));
    }
  }
</style>
