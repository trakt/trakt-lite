<script lang="ts">
  import { goto } from "$app/navigation";
  import { onDestroy } from "svelte";
  import { useOfflineDetection } from "./useOfflineDetection";

  const { isOfflineFromParams, isOfflineFromNavigator, cleanup } =
    useOfflineDetection();

  // Check if we're offline either from URL param or navigator
  const isOffline = $derived(isOfflineFromParams || $isOfflineFromNavigator);

  const handleRetry = () => {
    // Remove offline parameter and try to navigate to the current page
    const url = new URL(globalThis.location.href);
    url.searchParams.delete("offline");
    goto(url.pathname + url.search, { replaceState: true });
  };

  onDestroy(() => {
    cleanup();
  });
</script>

{#if isOffline}
  <div class="offline-banner" role="alert" aria-live="polite">
    <div class="offline-content">
      <div class="offline-icon">📡</div>
      <div class="offline-text">
        <h3>You're offline</h3>
        <p>Please check your internet connection and try again.</p>
      </div>
      <button type="button" class="retry-button" onclick={handleRetry}>
        Retry
      </button>
    </div>
  </div>
{/if}

<style>
  .offline-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 12px 16px;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .offline-content {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .offline-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .offline-text {
    flex: 1;
    min-width: 0;
  }

  .offline-text h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
  }

  .offline-text p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
  }

  .retry-button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .retry-button:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .retry-button:active {
    transform: translateY(1px);
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .offline-content {
      gap: 8px;
    }

    .offline-text h3 {
      font-size: 14px;
    }

    .offline-text p {
      font-size: 12px;
    }

    .retry-button {
      padding: 6px 12px;
      font-size: 12px;
    }
  }
</style>
