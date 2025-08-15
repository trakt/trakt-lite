import { browser } from '$app/environment';
import { page } from '$app/state';
import { writable } from 'svelte/store';

export function useOfflineDetection() {
  const isOfflineFromParams = page.url.searchParams.has('offline');

  const isOfflineFromNavigator = writable(false);

  if (browser) {
    // Update store based on navigator.onLine
    isOfflineFromNavigator.set(!navigator.onLine);

    // Listen for online/offline events
    const updateOnlineStatus = () => {
      isOfflineFromNavigator.set(!navigator.onLine);
    };

    globalThis.addEventListener('online', updateOnlineStatus);
    globalThis.addEventListener('offline', updateOnlineStatus);

    // Cleanup function would be called in onDestroy
    const cleanup = () => {
      globalThis.removeEventListener('online', updateOnlineStatus);
      globalThis.removeEventListener('offline', updateOnlineStatus);
    };

    return {
      isOfflineFromParams,
      isOfflineFromNavigator,
      cleanup,
    };
  }

  return {
    isOfflineFromParams,
    isOfflineFromNavigator,
    cleanup: () => {},
  };
}
