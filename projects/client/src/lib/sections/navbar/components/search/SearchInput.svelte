<script lang="ts">
  import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
  import * as m from "$lib/features/i18n/messages";
  import MediaSummaryItem from "$lib/sections/summary/components/media/MediaSummaryItem.svelte";
  import { clickOutside } from "$lib/utils/actions/clickOutside";
  import { useSearch } from "./useSearch";

  const { search, clear, isSearching, results } = useSearch();

  function onSearch(ev: Event) {
    const inputElement = ev.target as HTMLInputElement;

    search(inputElement.value);
  }

  let inputElement: HTMLInputElement;

  function clearOnClick(node: HTMLElement) {
    const handler = () => {
      inputElement.value = "";
      clear();
    };

    node.addEventListener("click", handler);

    return {
      destroy() {
        node.removeEventListener("click", handler);
      },
    };
  }

  function focusOnClick(node: HTMLElement) {
    const handler = () => {
      inputElement.focus();
    };

    node.addEventListener("click", handler);

    return {
      destroy() {
        node.removeEventListener("click", handler);
      },
    };
  }
</script>

<div class="trakt-search" class:search-is-loading={$isSearching}>
  <div use:focusOnClick class="trakt-search-icon">
    <SearchIcon />
  </div>
  <input
    use:clickOutside
    bind:this={inputElement}
    onclick={onSearch}
    onclickoutside={() => clear()}
    class="trakt-search-input"
    type="search"
    placeholder={m.search_placeholder()}
    oninput={onSearch}
  />
  {#if $results.length > 0}
    <div class="trakt-search-results" use:clearOnClick>
      {#each $results as result}
        <MediaSummaryItem media={result} type={result.type} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  @keyframes slide-left-to-right {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  :global(.trakt-navbar-scroll) {
    .trakt-search {
      --mobile-search-focus-width: calc(
        100dvw - var(--layout-distance-side) * 2 - var(--navbar-side-padding) *
          2
      );

      .trakt-search-input {
        background: color-mix(in srgb, var(--shade-940) 90%, transparent 10%);
        outline: var(--border-thickness-xs) solid var(--shade-700);

        @include for-mobile {
          &:not(:focus-within) {
            opacity: 0;
          }
        }
      }
    }
  }

  .trakt-search {
    --search-input-width: clamp(var(--ni-80), 100%, var(--ni-480));
    --search-input-height: var(--ni-48);
    --mobile-search-focus-width: calc(100dvw - var(--layout-distance-side) * 2);
    --search-icon-size: var(--ni-24);
    --search-icon-offset: calc(var(--search-icon-size) / 2);

    display: flex;
    height: var(--search-input-height);
    width: var(--search-input-width);
    align-items: center;

    position: relative;

    @include for-mobile {
      --search-input-width: var(--ni-48);
    }

    .trakt-search-icon {
      cursor: pointer;

      position: absolute;
      z-index: calc(var(--layer-top) + var(--layer-overlay));
      top: var(--search-icon-offset);
      left: var(--search-icon-offset);
    }

    .trakt-search-input {
      all: unset;
      height: 100%;
      width: 100%;
      padding: var(--ni-8) var(--ni-16);
      padding-left: calc(
        var(--search-icon-size) + var(--search-icon-offset) + var(--ni-16)
      );
      box-sizing: border-box;

      border-radius: var(--border-radius-s);
      background: color-mix(
        in srgb,
        var(--color-background) 75%,
        transparent 25%
      );
      backdrop-filter: blur(var(--ni-8));

      transition: var(--transition-increment) ease-in-out;
      transition-property: border-color, background-color, padding, width, top,
        left, opacity;

      @include for-mobile {
        width: var(--search-icon-size);
        position: absolute;
        top: 0;
        left: 0;

        &:not(:focus-within) {
          padding: var(--ni-8) var(--ni-24);
          outline: none;
          opacity: 0.75;
        }
      }

      &:placeholder-shown {
        text-overflow: ellipsis;
      }

      &:focus-within {
        outline-color: var(--purple-600);
        opacity: 1;

        @include for-mobile {
          left: 0;
          top: 0;
          width: var(--mobile-search-focus-width);
          z-index: var(--layer-top);
        }
      }

      &::-webkit-search-cancel-button {
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        width: var(--ni-16);
        height: var(--ni-16);
        background-image: url("$lib/sections/navbar/components/search/SearchClearIcon.svg");
        background-size: contain;
        cursor: pointer;
      }

      &::-moz-search-cancel-button {
        -moz-appearance: none;
        width: var(--ni-16);
        height: var(--ni-16);
        background-image: url("$lib/sections/navbar/components/search/SearchClearIcon.svg");
        background-size: contain;
        cursor: pointer;
      }

      @include for-mobile {
        &:not(:focus-within) {
          &::-webkit-search-cancel-button {
            all: unset;
          }
          &::-moz-search-cancel-button {
            all: unset;
          }
        }
      }
    }

    &.search-is-loading {
      &::after {
        --search-side-distance: var(--ni-32);

        content: "";
        z-index: var(--layer-overlay);

        width: calc(var(--search-input-width) - var(--search-side-distance));
        height: var(--ni-2);

        position: absolute;
        bottom: var(--ni-neg-2);
        left: calc(var(--search-side-distance) / 2);
        right: 0;

        border-radius: 50%;
        background: linear-gradient(
          90deg,
          var(--color-foreground) 0%,
          var(--color-foreground) 50%,
          transparent 50%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: slide-left-to-right calc(var(--transition-increment) * 10)
          linear infinite;
      }

      @include for-mobile {
        &::after {
          z-index: calc(var(--layer-top) + var(--layer-overlay));
        }

        &:has(input:focus-within) {
          &::after {
            width: calc(
              var(--mobile-search-focus-width) - var(--search-side-distance)
            );
          }
        }
      }
    }

    .trakt-search-results {
      --search-results-top: calc(var(--search-input-height) + var(--gap-s));
      z-index: var(--layer-overlay);

      position: absolute;
      top: var(--search-results-top);
      left: 0;
      right: 0;

      min-height: calc(var(--height-result-item) * 7);
      height: 100vh;
      max-height: calc(80dvh - var(--search-results-top));
      width: clamp(
        var(--ni-280),
        var(--mobile-search-focus-width) - var(--ni-16),
        var(--ni-480)
      );
      padding: var(--ni-8);

      overflow: hidden;
      overflow-y: scroll;

      background: color-mix(
        in srgb,
        var(--color-background) 90%,
        transparent 10%
      );
      backdrop-filter: blur(var(--ni-8));
      border-radius: var(--border-radius-l);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      :global(a.trakt-link) {
        text-decoration: none;
        transition: background-color var(--transition-increment) ease-in-out;

        @include for-mouse {
          &:hover,
          &:focus-visible {
            background: var(--purple-900);
            color: var(--shade-10);
            border-radius: var(--border-radius-m);
          }
        }

        &:active {
          background: var(--purple-700);
        }
      }
    }
  }
</style>
