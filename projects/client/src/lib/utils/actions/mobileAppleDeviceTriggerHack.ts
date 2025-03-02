import { afterNavigate } from '$app/navigation';
import { NOOP_FN } from '../constants.ts';
import { getMobileAppleDeviceType } from '../devices/getMobileAppleDeviceType.ts';

export function isMobileAppleDevice() {
  const deviceType = getMobileAppleDeviceType();

  return deviceType === 'iphone' || deviceType === 'ipad';
}

/**
 * This function is needed to handle touch events on mobile Apple devices.
 * On iOS & iPadOS, touch events do not trigger click events by immediately in certain scenarios.
 * This utility ensures that a click event is triggered when a touch event ends,
 * providing a consistent user experience across different devices.
 */
export function mobileAppleDeviceTriggerHack(
  node: HTMLAnchorElement,
  enabled = true,
) {
  // TODO(@seferturan): investigate why we need to disable for search items
  // relates to https://github.com/trakt/trakt-lite/issues/291
  if (!enabled || !isMobileAppleDevice()) {
    return {
      destroy: NOOP_FN,
    };
  }

  const handleTouchEnd = async (event: PointerEvent) => {
    const isMouse = event.pointerType === 'mouse';

    if (isMouse) {
      return;
    }

    const isElement = event.target instanceof HTMLElement;
    if (!isElement) {
      return;
    }

    const navigationCheck = () =>
      new Promise<boolean>((resolve) => {
        afterNavigate(() => resolve(true));
        // If no navigation occurs within a frame, resolve with false
        requestAnimationFrame(() => resolve(false));
      });

    const didNavigate = await navigationCheck();

    if (!didNavigate) {
      event.preventDefault();
      event.stopPropagation();
      event.target.click();
    }
  };

  node.addEventListener('pointerup', handleTouchEnd);

  return {
    destroy() {
      node.removeEventListener('pointerup', handleTouchEnd);
    },
  };
}
