<script lang="ts">
  import { disableTransitionOn } from "$lib/utils/actions/disableTransitionOn.ts";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import { usePortal } from "../buttons/popup/_internal/usePortal.ts";
  import type { TraktDropdownListProps } from "./TraktDropdownListProps.ts";

  const {
    onclick,
    icon: _icon,
    children,
    items,
    size,
    ...props
  }: TraktDropdownListProps = $props();
  const isDropdownOpen = writable(false);

  const { portalTrigger, portal, isOpened } = usePortal();
</script>

<button
  use:disableTransitionOn={"touch"}
  use:portalTrigger
  aria-haspopup="true"
  class="trakt-dropdown-list-button"
  class:is-opened={$isOpened}
  {...props}
>
  {@render children()}
</button>

{#if $isOpened}
  <div
    class="trakt-dropdown-list-container"
    transition:slide={{ duration: 150 }}
    use:portal
  >
    <div class="spacer"></div>
    <ul>
      {@render items()}
    </ul>
  </div>
{/if}

<!--   
<div
  class="trakt-dropdown-list-container"
  class:is-list-open={$isDropdownOpen}
  use:clickOutside
  onclickoutside={(e) => {
    isDropdownOpen.set(false);
  }}
  data-size={size}
>
  {#if $isDropdownOpen}
    <div class="trakt-list" transition:slide={{ duration: 150 }}>
      <div class="spacer"></div>
      <ul onclickcapture={() => isDropdownOpen.set(false)}>
        {@render items()}
      </ul>
    </div>
  {/if}

  <Button
    onclick={(ev) => {
      isDropdownOpen.update((state) => !state);
      onclick?.(ev);
    }}
    style="textured"
    {size}
    {...props}
  >
    {@render children()}
    {#snippet icon()}
      <div class="trakt-dropdown-list-icon">
        {#if _icon != null}
          {@render _icon()}
        {/if}
        <DropdownIcon open={$isDropdownOpen} disabled={props.disabled} />
      </div>
    {/snippet}
  </Button>
</div> -->

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  // .trakt-dropdown-list-container {
  //   position: relative;
  //   padding: var(--ni-14);
  //   margin: var(--ni-neg-14);
  //   background: transparent;
  //   box-sizing: content-box;
  //   display: flex;

  //   :global(.trakt-button) {
  //     flex-grow: 1;
  //   }

  //   &[data-size="small"] {
  //     // TODO change back to transform scale when scaling is fixed
  //     --small-padding: var(--ni-10);
  //     padding: var(--small-padding);
  //     margin: 0 var(--ni-neg-10);

  //     :global(li) {
  //       padding: 0 var(--small-padding);
  //       height: calc(var(--ni-16) + var(--small-padding) * 2);
  //       width: calc(100% - var(--small-padding) * 4);
  //     }

  //     :global(li p) {
  //       font-size: var(--ni-12);
  //     }

  //     :global(.trakt-button) {
  //       min-width: fit-content;
  //     }

  //     .trakt-dropdown-list-icon {
  //       :global(.trakt-dropdown-caret) {
  //         width: var(--ni-12);
  //         height: var(--ni-12);
  //       }
  //     }

  //     .trakt-list .spacer {
  //       height: calc(var(--ni-24) + var(--small-padding) * 2);
  //     }
  //   }

  //   &.is-list-open {
  //     z-index: var(--layer-menu);

  //     :global(.trakt-button) {
  //       z-index: var(--layer-menu);
  //     }

  //     .trakt-list {
  //       z-index: var(--layer-menu);
  //       opacity: 1;
  //     }

  //     .trakt-dropdown-list-icon {
  //       z-index: var(--layer-menu);
  //     }
  //   }

  //   .trakt-dropdown-list-icon {
  //     display: flex;
  //     gap: var(--gap-s);
  //   }

  //   :global(.trakt-button[disabled]:active) {
  //     :global(.trakt-dropdown-list-icon .trakt-dropdown-list-caret) {
  //       animation: loopy-loop var(--animation-duration-loopy-loop) infinite;
  //     }
  //   }

  //   ul {
  //     all: unset;

  //     display: grid;
  //     max-height: var(--ni-220);
  //     overflow-y: auto;

  //     @include for-mouse {
  //       &::-webkit-scrollbar {
  //         width: var(--ni-8);
  //       }

  //       &::-webkit-scrollbar-thumb {
  //         background-color: var(--shade-300);
  //         border-radius: var(--border-radius-xs);
  //         backdrop-filter: blur(var(--ni-4));
  //       }
  //     }
  //   }

  //   .trakt-list {
  //     --list-padding: var(--ni-12);

  //     z-index: var(--layer-background);
  //     position: absolute;
  //     width: 100%;
  //     left: 0;
  //     top: 0;
  //     opacity: 0;
  //     transition: opacity var(--transition-increment) ease-in-out;

  //     padding: var(--list-padding) 0;
  //     border-radius: var(--border-radius-m);
  //     border-radius: var(--border-radius-m);

  //     background-color: var(--shade-10);

  //     div.spacer {
  //       height: calc(var(--ni-40) + var(--list-padding) * 2);
  //     }
  //   }
  // }

  $button-size: var(--ni-24);
  $button-padding: var(--ni-4);

  @mixin popup-button-style() {
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
  }

  button {
    &:global(.is-opened) {
      z-index: calc(var(--layer-menu) + 1);
    }
  }

  .trakt-dropdown-list-container {
    --list-padding: var(--ni-8);
    --list-margin: var(--ni-12);

    z-index: var(--layer-menu);
    position: absolute;

    margin-top: calc(-1 * var(--list-margin));
    margin-left: var(--list-margin);

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
      var(--ni-0) var(--ni-95) var(--ni-32) var(--ni-0)
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
      height: calc($button-size + $button-padding * 2);
    }

    .trakt-popup-menu-button-placeholder {
      position: absolute;
      top: 0;
      left: 0;

      @include popup-button-style();

      animation: rotate-90 var(--transition-increment) ease-in;
      transform: rotate(90deg);

      color: var(--purple-900);
    }

    &:global([data-popup-direction="left"]) {
      .trakt-popup-menu-button-placeholder {
        right: 0;
        left: auto;
      }
    }

    &:global([data-popup-direction="unaligned"]) {
      .trakt-popup-menu-button-placeholder {
        display: none;
      }
    }

    &:global(.removing) {
      .trakt-popup-menu-button-placeholder {
        transform: rotate(0deg);
      }
    }
  }
</style>
