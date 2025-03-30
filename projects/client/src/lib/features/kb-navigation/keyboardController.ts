import { afterNavigate } from '$app/navigation';
import { GlobalEventBus } from '$lib/utils/events/GlobalEventBus.ts';
import { onMount } from 'svelte';
import { focusSomething } from './_internal/focusSomething.ts';
import { handleItemNavigation } from './_internal/handleItemNavigation.ts';
import { handleListNavigation } from './_internal/handleListNavigation.ts';

/*
  // TODO only for android tv webview
  // TODO action on body level?
  // TODO less hacky code + more robust
  // TODO is opt-in navigation the way to go?
*/

export function keyboardController(_: HTMLElement) {
  afterNavigate(() => {
    // TODO no timeout
    setTimeout(() => {
      const firstNavigableElement = document.querySelector(
        '[data-kb-navigation="item"]',
      );
      if (firstNavigableElement instanceof HTMLElement) {
        firstNavigableElement.focus();
      }
    }, 1000);
  });

  onMount(() => {
    const handler = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
          focusSomething();
          ev.preventDefault();
          break;
      }

      switch (ev.key) {
        case 'ArrowLeft':
          handleItemNavigation('left');
          break;
        case 'ArrowRight':
          handleItemNavigation('right');
          break;
        case 'ArrowUp':
          handleListNavigation('up');
          break;
        case 'ArrowDown':
          handleListNavigation('down');
          break;
      }
    };

    const destroy = GlobalEventBus.getInstance().register('keydown', handler);

    return {
      destroy,
    };
  });
}
