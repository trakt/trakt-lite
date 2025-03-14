<script lang="ts">
  import { useActiveLink } from "$lib/stores/useActiveLink";
  import { disableTransitionOn } from "$lib/utils/actions/disableTransitionOn";
  import { mobileAppleDeviceTriggerHack } from "$lib/utils/actions/mobileAppleDeviceTriggerHack";
  import { triggerWithKeyboard } from "$lib/utils/actions/triggerWithKeyboard";
  import type { TraktActionButtonProps } from "./TraktActionButtonProps";

  type TraktActionButtonAnchorProps = HTMLAnchorProps & TraktActionButtonProps;

  const {
    children,
    label,
    variant = "primary",
    color = "default",
    size = "normal",
    style = "flat",
    ...props
  }: TraktActionButtonProps | TraktActionButtonAnchorProps = $props();

  const href = $derived((props as TraktActionButtonAnchorProps).href);
  const noscroll = $derived((props as TraktActionButtonAnchorProps).noscroll);
  const { isActive } = $derived(useActiveLink(href));
</script>

{#if href != null}
  <a
    use:disableTransitionOn={"touch"}
    use:triggerWithKeyboard
    use:mobileAppleDeviceTriggerHack
    data-sveltekit-keepfocus
    data-sveltekit-noscroll={noscroll}
    class="trakt-action-button trakt-button-link"
    class:trakt-link-active={$isActive}
    aria-label={label}
    data-color={color}
    data-variant={variant}
    data-style={style}
    {...props}
  >
    {@render children()}
  </a>
{:else}
  <button
    use:disableTransitionOn={"touch"}
    class="trakt-action-button trakt-button-link"
    aria-label={label}
    data-color={color}
    data-variant={variant}
    data-size={size}
    data-style={style}
    {...props}
  >
    {@render children()}
  </button>
{/if}

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  @mixin variant-styles($variant, $background-color, $foreground-color) {
    &[data-variant="#{$variant}"] {
      --color-background-action-button: #{$background-color};
      --color-foreground-action-button: #{$foreground-color};

      @include for-mouse {
        &:hover,
        &:focus-visible {
          --color-background-action-button: #{$foreground-color};
          --color-foreground-action-button: #{$background-color};
        }
      }
    }
  }

  @mixin color-styles($color) {
    &[data-color="#{$color}"] {
      $background-color: var(--color-background-#{$color});
      $foreground-color: var(--color-foreground-#{$color});

      @include variant-styles("primary", $background-color, $foreground-color);

      @include variant-styles(
        "secondary",
        $foreground-color,
        $background-color
      );

      @include for-mouse {
        &:focus-visible {
          outline: var(--border-thickness-xs) solid
            var(--color-foreground-action-button);
        }
      }
    }
  }

  .trakt-action-button {
    --button-size: var(--ni-40);

    all: unset;

    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    display: flex;
    width: var(--button-size);
    height: var(--button-size);
    padding: var(--ni-6);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: var(--border-radius-m);
    background-color: var(--color-background-action-button);
    color: var(--color-foreground-action-button);

    transition: background-color var(--transition-increment) ease-in-out;

    @each $color in "purple", "red", "blue", "orange", "default" {
      @include color-styles($color);
    }

    &[disabled]:not([disabled="false"]) {
      cursor: not-allowed;
      color: var(--color-foreground-button-disabled);
      background: var(
        --color-background-button-disabled,
        var(--color-surface-button-disabled)
      );

      &::before {
        display: none;
      }
    }

    &:active {
      transform: scale(0.95);

      &[disabled]:not([disabled="false"]) {
        animation: jiggle-wiggle var(--animation-duration-jiggle-wiggle)
          infinite;
      }
    }

    &[data-size="small"] {
      scale: 0.8;
      margin: var(--ni-neg-8);
    }

    &[data-style="ghost"] {
      background-color: transparent;

      &:focus-visible {
        background-color: var(--color-background-action-button);
      }

      @include for-mouse {
        &:hover:not([disabled]) {
          background-color: var(--color-background-action-button);
        }
      }
    }
  }
</style>
