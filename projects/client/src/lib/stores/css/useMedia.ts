import { browser } from '$app/environment';
import {
  breakpointDesktop,
  breakpointMobile,
  breakpointTabletLgMax,
  breakpointTabletLgMin,
  breakpointTabletSmMax,
  breakpointTabletSmMin,
} from '$style/scss/variables/index.ts';
import { onDestroy, onMount } from 'svelte';
import { writable } from 'svelte/store';

export const WellKnownMediaQuery = {
  mobile: `(max-width: ${breakpointMobile})`,
  tabletSmall:
    `(min-width: ${breakpointTabletSmMin}) and (max-width: ${breakpointTabletSmMax})`,
  tabletLarge:
    `(min-width: ${breakpointTabletLgMin}) and (max-width: ${breakpointTabletLgMax})`,
  desktop: `(min-width: ${breakpointDesktop})`,
  mouse: '(hover: hover) and (pointer: fine)',
  touch: '(hover: none) and (pointer: coarse)',
};

type MediaCallback = () => void;

class MediaQueryManager {
  private static instance: MediaQueryManager;
  private queries: Map<string, {
    mediaQuery: MediaQueryList;
    callbacks: Set<MediaCallback>;
  }> = new Map();

  private constructor() {}

  static getInstance(): MediaQueryManager {
    if (!this.instance) {
      this.instance = new MediaQueryManager();
    }
    return this.instance;
  }

  subscribe(query: string, callback: MediaCallback): () => void {
    if (!browser) {
      return () => {};
    }

    if (!this.queries.has(query)) {
      const mediaQuery = globalThis.matchMedia(query);
      this.queries.set(query, {
        mediaQuery,
        callbacks: new Set(),
      });

      mediaQuery.addEventListener('change', () => {
        this.queries.get(query)?.callbacks.forEach((cb) => cb());
      });
    }

    const entry = this.queries.get(query)!;
    entry.callbacks.add(callback);

    callback();

    return () => {
      entry.callbacks.delete(callback);
      if (entry.callbacks.size === 0) {
        this.queries.delete(query);
      }
    };
  }

  matches(query: string): boolean {
    if (!browser) return false;
    return globalThis.matchMedia(query).matches;
  }
}

export function useMedia(query: string) {
  const value = writable(false);
  const manager = MediaQueryManager.getInstance();

  const unsubscribe = manager.subscribe(query, () => {
    value.set(manager.matches(query));
  });

  onMount(() => {
    return manager.subscribe(query, () => {
      value.set(manager.matches(query));
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  return value;
}
