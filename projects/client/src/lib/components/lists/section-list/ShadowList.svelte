<script lang="ts" generics="T extends { id: unknown }">
  import { useVarToPixels } from "$lib/stores/css/useVarToPixels";
  import { whenInViewport } from "$lib/utils/actions/whenInViewport";
  import { onMount, type Snippet } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import "../_internal/list.css";
  import ListHeader from "../_internal/ListHeader.svelte";
  import { useScrollHistoryAction } from "../_internal/useScrollHistoryAction";
  import type { ListProps } from "../ListProps";
  import { scrollTracking } from "./scrollTracking";

  type SectionListProps<T> = ListProps<T> & {
    empty?: Snippet;
    scrollContainer?: Writable<HTMLDivElement>;
    scrollX?: Writable<{ left: number; right: number }>;
    variant?: "normal" | "centered";
  };

  const {
    id,
    items,
    title,
    scrollX = writable({ left: 0, right: 0 }),
    scrollContainer = writable(),
    item,
    actions,
    badge,
    empty,
    variant = "normal",
  }: SectionListProps<T> = $props();
  const sideDistance = useVarToPixels("var(--layout-distance-side)");
  const windowShadowWidth = useVarToPixels("var(--ni-64)");

  const isLeftShadowVisible = $derived($scrollX.left > $sideDistance);
  const isRightShadowVisible = $derived($scrollX.right > $sideDistance);

  const leftShadowIntensity = $derived(
    ($scrollX.left - $sideDistance) / $windowShadowWidth,
  );

  const rightShadowIntensity = $derived(
    ($scrollX.right - $sideDistance) / $windowShadowWidth,
  );

  const isVisible = writable(false);
  const isMounted = writable(false);

  const { scrollHistory } = useScrollHistoryAction("horizontal");

  onMount(() => {
    isMounted.set(true);
  });
</script>

<section
  use:whenInViewport={() => isVisible.set(true)}
  class="shadow-list-container"
>
  {#if $isVisible}
    <ListHeader {title} {actions} {badge} inset="title" />
    <div
      class="shadow-list"
      class:shadow-list-left-shadow={isLeftShadowVisible}
      class:shadow-list-right-shadow={isRightShadowVisible}
      style:--left-shadow-opacity={leftShadowIntensity}
      style:--right-shadow-opacity={rightShadowIntensity}
    >
      {#if items.length > 0}
        <div
          bind:this={$scrollContainer}
          use:scrollTracking={scrollX}
          use:scrollHistory={id}
          class="trakt-list-item-container"
          class:shadow-list-horizontal-scroll-centered={variant === "centered"}
          class:shadow-list-horizontal-scroll={variant === "normal"}
        >
          {#each items as i (i.id)}
            {@render item(i)}
          {/each}
        </div>
      {:else if empty != null && $isMounted}
        <div class="shadow-list-empty-state">
          {@render empty()}
        </div>
      {/if}
    </div>
  {/if}
</section>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;
  @use "../_internal/gap" as *;

  .shadow-list-container,
  .shadow-list,
  .shadow-list-empty-state {
    min-height: var(--height-list);
  }

  .shadow-list-container {
    display: flex;
    flex-direction: column;
    transition: gap var(--transition-increment) ease-in-out;

    @include adaptive-list-gap();
  }

  .shadow-list-empty-state {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: var(--gap-m);
    justify-content: center;
    align-items: center;

    :global(> p) {
      padding: 0 var(--ni-16);
      text-align: center;
    }
  }

  .shadow-list {
    position: relative;

    &.shadow-list-left-shadow::before {
      opacity: var(--left-shadow-opacity);
    }

    &.shadow-list-right-shadow::after {
      opacity: var(--right-shadow-opacity);
    }

    &::before {
      --list-shadow-direction: to left;
      left: 0;
    }

    &::after {
      --list-shadow-direction: to right;
      right: 0;
    }

    &::before,
    &::after {
      content: "";
      z-index: var(--layer-floating);
      pointer-events: none;

      position: absolute;
      top: 0;

      width: var(--ni-56);
      height: var(--height-list);

      opacity: 0;

      background: linear-gradient(
        var(--list-shadow-direction),
        transparent 0%,
        color-mix(in srgb, var(--color-background) 7%, transparent 93%) 13%,
        color-mix(in srgb, var(--color-background) 18%, transparent 82%) 24%,
        color-mix(in srgb, var(--color-background) 29%, transparent 71%) 34%,
        color-mix(in srgb, var(--color-background) 43%, transparent 57%) 46%,
        color-mix(in srgb, var(--color-background) 62%, transparent 38%) 63%,
        color-mix(in srgb, var(--color-background) 86%, transparent 14%) 86%,
        var(--color-background) 100%
      );

      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 75%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  .shadow-list-horizontal-scroll-centered,
  .shadow-list-horizontal-scroll {
    height: var(--height-list);
    display: flex;
    overflow-x: auto;
    transition: gap var(--transition-increment) ease-in-out;
    @include adaptive-gap(gap);
  }

  .shadow-list-horizontal-scroll {
    scroll-snap-type: x proximity;

    & > :global(:not(svelte-css-wrapper)) {
      scroll-snap-align: start;

      @include for-mobile() {
        scroll-snap-align: unset;
      }

      &:first-child,
      &:last-child {
        scroll-snap-align: end;

        @include for-mobile() {
          scroll-snap-align: unset;
        }
      }
    }

    & > :global(svelte-css-wrapper > *) {
      scroll-snap-align: start;

      @include for-mobile() {
        scroll-snap-align: unset;
      }
    }

    & > :global(svelte-css-wrapper:first-child > *),
    & > :global(svelte-css-wrapper:last-child > *) {
      scroll-snap-align: end;

      @include for-mobile() {
        scroll-snap-align: unset;
      }
    }
  }

  .shadow-list-horizontal-scroll-centered {
    --center-offset: calc(50% - var(--item-width) / 2);

    scroll-snap-type: x mandatory;
    padding-left: var(--center-offset);
    padding-right: var(--center-offset);

    & > :global(:not(svelte-css-wrapper)),
    & > :global(svelte-css-wrapper > *) {
      scroll-snap-align: center;
    }
  }
</style>
