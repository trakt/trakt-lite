import { afterNavigate } from '$app/navigation';
import { handleItemNavigation } from '$lib/features/kb-navigation/_internal/handleItemNavigation.ts';
import { handleListNavigation } from '$lib/features/kb-navigation/_internal/handleListNavigation.ts';
import { onMount } from 'svelte';

/*
  // TODO only for android tv webview
  // TODO action on body level?
  // TODO less hacky code + more robust
  // TODO is opt-in navigation the way to go?
*/

export function keyboardController(node: HTMLElement) {
  afterNavigate(() => {
    // TODO no timeout
    setTimeout(() => {
      const firstNavigableElement = document.querySelector(
        '[data-kb-navigation="item"]',
      );
      console.log(firstNavigableElement);
      if (firstNavigableElement instanceof HTMLElement) {
        console.log('focus');
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

    node.addEventListener('keydown', handler);

    return {
      destroy() {
        node.removeEventListener('keydown', handler);
      },
    };
  });
}
