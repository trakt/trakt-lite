<script lang="ts">
  import SwitchIcon from "../icons/SwitchIcon.svelte";
  import type { TraktSwitchProps } from "./TraktSwitchProps";

  const {
    isChecked,
    label,
    innerText,
    color = "purple",
    ...props
  }: TraktSwitchProps = $props();
</script>

<button
  class="trakt-switch"
  role="switch"
  aria-checked={$isChecked}
  aria-label={label}
  onclick={() => isChecked.update((value) => !value)}
  data-color={color}
  {...props}
>
  <div class="trakt-switch-tick"><SwitchIcon /></div>
  <p class="trakt-switch-text meta-info ellipsis">{innerText}</p>
</button>

<style lang="scss">
  @mixin color-styles($color) {
    &[data-color="#{$color}"] {
      // TODO naming & extract + add support for custom & default
      --color-foreground: var(--#{$color}-10);
      --color-background: var(--#{$color}-50);

      --color-foreground-alternative: var(--#{$color}-500);
      --color-background-alternative: var(--#{$color}-800);

      --color-tick: var(--#{$color}-500);
    }
  }

  .trakt-switch {
    --button-width: var(--ni-64);
    --button-height: var(--ni-28);

    --text-width: var(--ni-24);
    --text-offset: var(--ni-10);

    --tick-size: var(--ni-20);
    --tick-offset: var(--ni-4);

    all: unset;
    cursor: pointer;

    display: flex;
    position: relative;
    align-items: center;

    min-width: var(--button-width);
    max-width: var(--button-width);
    width: var(--button-width);
    height: var(--button-height);

    color: var(--color-foreground);
    box-shadow: var(--ni-0) var(--ni-4) var(--ni-4) var(--ni-0)
      color-mix(in srgb, var(--shade-940) 24%, transparent 76%) inset;

    box-sizing: border-box;
    padding: var(--ni-4);
    border-radius: var(--border-radius-l);

    transition: var(--transition-increment) ease-in-out;
    transition-property: background-color, outline;

    background-color: var(--color-background);

    @each $color in "purple", "red", "blue", "orange" {
      @include color-styles($color);
    }

    &:active[disabled] {
      animation: jiggle-wiggle var(--animation-duration-jiggle-wiggle) infinite;
    }

    &[disabled] {
      --color-tick: var(--color-foreground-button-disabled);

      --color-foreground: var(--color-foreground-button-disabled);
      --color-foreground-alternative: var(--color-foreground-button-disabled);

      --color-background: var(--color-surface-button-disabled);
      --color-background-alternative: var(--color-surface-button-disabled);

      cursor: not-allowed;
    }

    &:hover:not([disabled]) {
      background-color: var(--color-background-alternative);

      .trakt-switch-text {
        color: var(--color-foreground);
      }

      .trakt-switch-tick {
        :global(svg) {
          transform: rotate(45deg);
        }
      }
    }

    .trakt-switch-text {
      transition: var(--transition-increment) ease-in-out;
      transition-property: color, transform;

      position: absolute;
      left: var(--text-offset);
      width: var(--text-width);

      color: var(--color-foreground-alternative);
      transform: translateX(
        calc(var(--button-width) - var(--text-width) - 2 * var(--text-offset))
      );
    }

    .trakt-switch-tick {
      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: var(--tick-offset);
      left: var(--tick-offset);

      width: var(--tick-size);
      height: var(--tick-size);

      background: var(--color-tick);
      border-radius: 50%;

      transition: transform var(--transition-increment) ease-in-out;

      :global(svg) {
        transition: transform var(--transition-increment) ease-in-out;
      }

      &::before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        box-shadow:
          var(--ni-1) var(--ni-neg-2) var(--ni-4) var(--ni-0)
            color-mix(in srgb, black 25%, transparent 75%) inset,
          var(--ni-0) var(--ni-1) var(--ni-2) var(--ni-0)
            color-mix(in srgb, white 44%, transparent 56%) inset,
          var(--ni-0) var(--ni-2) var(--ni-8) var(--ni-0)
            color-mix(in srgb, black 16%, transparent 84%);
      }
    }

    &[aria-checked="true"] {
      // TODO extract as mixin, reuse in case false
      background-color: var(--color-background-alternative);

      .trakt-switch-text {
        color: var(--color-foreground);
        transform: translateX(0);
      }

      .trakt-switch-tick {
        transform: translateX(
          calc(var(--button-width) - var(--tick-size) - 2 * var(--tick-offset))
        );

        :global(svg) {
          transform: rotate(90deg);
        }
      }

      &:hover:not([disabled]) {
        background-color: var(--color-background);

        .trakt-switch-text {
          color: var(--color-foreground-alternative);
        }

        .trakt-switch-tick {
          :global(svg) {
            transform: rotate(45deg);
          }
        }
      }
    }

    &:focus-visible {
      outline: var(--border-thickness-xs) solid var(--color-foreground);
    }
  }
</style>
