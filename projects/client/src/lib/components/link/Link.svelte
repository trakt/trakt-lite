<script lang="ts">
  import { DpadNavigationType } from "$lib/features/navigation/models/DpadNavigationType";
  import { appendGlobalParameters } from "$lib/features/parameters/appendGlobalParameters";
  import { useActiveLink } from "$lib/stores/useActiveLink";
  import { mobileAppleDeviceTriggerHack } from "$lib/utils/actions/mobileAppleDeviceTriggerHack";
  import { triggerWithKeyboard } from "$lib/utils/actions/triggerWithKeyboard";

  const {
    children,
    href,
    target,
    color = "default",
    focusable = true,
    noscroll,
    label,
    navigationType,
    ...props
  }: ChildrenProps &
    HTMLAnchorProps &
    HTMLElementProps & {
      color?: "default" | "classic" | "inherit";
      focusable?: boolean;
      navigationType?: DpadNavigationType;
    } = $props();

  const { isActive } = $derived(useActiveLink(href));
</script>

{#if href}
  <a
    {href}
    {target}
    use:triggerWithKeyboard
    use:mobileAppleDeviceTriggerHack
    use:appendGlobalParameters
    data-sveltekit-keepfocus
    data-sveltekit-noscroll={noscroll}
    tabindex={focusable ? 0 : -1}
    data-color={color}
    aria-label={label}
    class="trakt-link"
    class:trakt-link-active={$isActive}
    data-dpad-navigation={navigationType}
    {...props}
  >
    {@render children?.()}
  </a>
{:else}
  {@render children?.()}
{/if}

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-link {
    -webkit-tap-highlight-color: transparent;
    color: inherit;
    cursor: pointer;
    transition: var(--transition-increment) ease-in-out;
    transition-property: color, text-decoration;
    display: inline;

    :global(p),
    :global(span) {
      color: inherit;
    }

    text-decoration: underline;
    text-underline-offset: var(--ni-2);
    text-decoration-thickness: var(--ni-2);

    &:focus-visible {
      outline: none;
      position: relative;
    }

    &[data-color="default"] {
      @include default-link-style;

      &.trakt-link-active {
        &,
        &:visited {
          color: var(--color-link-active);
        }

        @include for-mouse {
          &:hover {
            color: var(--color-foreground);
          }
        }
      }
    }

    &[data-color="classic"] {
      display: inline;

      &:visited {
        color: var(--red-300);
        text-decoration-color: var(--red-300);
      }

      @include for-mouse {
        &:hover {
          color: var(--blue-600);
          text-decoration-color: var(--blue-300);
        }
      }
    }
  }
</style>
