import { useNavigation } from '$lib/features/navigation/useNavigation.ts';
import { NOOP_FN } from '$lib/utils/constants.ts';
import { onMount } from 'svelte';
import type { ActionReturn } from 'svelte/action';
import { get } from 'svelte/store';

export function whenInViewport(
  element: HTMLElement,
  callback: () => void,
): ActionReturn<undefined> {
  const { navigation } = useNavigation();
  if (get(navigation) === 'dpad') {
    onMount(() => {
      callback();
    });

    return {
      destroy: NOOP_FN,
    };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          queueMicrotask(() => observer.disconnect());
        }
      });
    },
    { threshold: 0.1 },
  );

  if (element) {
    observer.observe(element);
  }

  return {
    destroy: () => {
      if (element) {
        observer.unobserve(element);
      }
    },
  };
}
