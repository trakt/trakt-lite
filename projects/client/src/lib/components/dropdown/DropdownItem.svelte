<script lang="ts">
  import { disableNavigation } from "$lib/utils/actions/disableNavigation";
  import { triggerWithKeyboard } from "$lib/utils/actions/triggerWithKeyboard";
  import type { Snippet } from "svelte";
  import Link from "../link/Link.svelte";

  type DropdownItemProps = {
    color?: "red" | "purple" | "blue" | "orange" | "default";
    tabindex?: number;
    icon?: Snippet;
    style?: "ghost" | "flat";
    variant?: "primary" | "secondary";
  } & ChildrenProps &
    HTMLElementProps;

  type DropdownItemAnchorProps = DropdownItemProps & HTMLAnchorProps;

  const {
    color = "purple",
    style = "ghost",
    variant = "primary",
    children,
    icon,
    ...props
  }: DropdownItemProps | DropdownItemAnchorProps = $props();

  const hasHandler = $derived(
    Object.keys(props).some((propName) => propName.startsWith("on")),
  );
  const tabIndex = $derived(hasHandler ? 0 : -1);
  const href = $derived((props as DropdownItemAnchorProps).href);
  const noscroll = $derived((props as DropdownItemAnchorProps).noscroll);
  const target = $derived((props as DropdownItemAnchorProps).target);

  // FIXME: use button when not href & update selectors in applicable icons
</script>

{#snippet text()}
  <p class="small bold uppercase ellipsis">{@render children()}</p>
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
  use:triggerWithKeyboard
  use:disableNavigation={props.disabled}
  tabindex={tabIndex}
  data-color={color}
  data-style={style}
  data-variant={variant}
  {...props}
>
  {#if href}
    <Link {href} {noscroll} {target} color="inherit">
      {@render text()}
      {#if icon}
        <div class="item-icon">
          {@render icon()}
        </div>
      {/if}
    </Link>
  {:else}
    <p class="small bold uppercase ellipsis">
      {@render text()}
    </p>
    {#if icon}
      <div class="item-icon">
        {@render icon()}
      </div>
    {/if}
  {/if}
</li>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  li {
    text-decoration: none;
    list-style-type: none;
    user-select: none;

    padding: 0 var(--ni-12);
    height: calc(var(--ni-20) + var(--ni-12) * 2);
    width: calc(100% - var(--ni-36));
    border-radius: var(--border-radius-m);

    align-content: center;
    justify-self: center;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-s);

    cursor: pointer;

    transition: var(--transition-increment) ease-in-out;
    transition-property: background, color;

    .item-icon {
      display: flex;
    }

    &:active[disabled="true"] {
      animation: jiggle-wiggle var(--animation-duration-jiggle-wiggle) infinite;
    }

    &[disabled="true"] {
      cursor: not-allowed;
    }

    :global(.trakt-link) {
      color: inherit;
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: space-between;
      text-decoration: none;
    }

    @mixin variant($color, $bg-color) {
      color: $color;

      @include for-mouse {
        &:hover:not([disabled="true"]) {
          background: $bg-color;
        }
      }

      &[data-style="flat"] {
        background: $color;
        color: $bg-color;

        @include for-mouse {
          &:hover:not([disabled="true"]) {
            background: $bg-color;
            color: $color;
          }
        }
      }

      &[disabled="true"] {
        background: var(--color-foreground-button-disabled);
        color: var(--color-surface-button-disabled);
      }
    }

    @mixin color($color, $active-bg, $outline-color, $bg-color) {
      &[data-variant="primary"] {
        @include variant($color, $bg-color);
      }

      &[data-variant="secondary"] {
        @include variant($bg-color, $color);
      }

      &:active {
        background: $active-bg;
      }

      &:focus-visible,
      &:has(> :global(.trakt-link:focus-visible)) {
        outline: var(--border-thickness-xs) solid $outline-color;
      }
    }

    &[data-color="purple"] {
      @include color(
        var(--purple-800),
        var(--purple-200),
        var(--purple-800),
        var(--purple-50)
      );
    }

    &[data-color="red"] {
      @include color(
        var(--red-600),
        var(--red-200),
        var(--red-600),
        var(--red-50)
      );
    }

    &[data-color="blue"] {
      @include color(
        var(--blue-600),
        var(--blue-200),
        var(--blue-600),
        var(--blue-50)
      );
    }

    &[data-color="orange"] {
      @include color(
        var(--orange-600),
        var(--orange-200),
        var(--orange-600),
        var(--orange-50)
      );
    }

    &[data-color="default"] {
      @include color(
        var(--shade-700),
        var(--shade-200),
        var(--shade-700),
        var(--shade-50)
      );
    }
  }
</style>
