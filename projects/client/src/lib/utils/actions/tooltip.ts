// import { GlobalEventBus } from '$lib/utils/events/GlobalEventBus.ts';
// import tippy from 'tippy.js';

import { onMount } from 'svelte';

// //https://atomiks.github.io/tippyjs/v6/plugins/#hideonesc
// const hideOnEscape = {
//   name: 'hideOnEscape',
//   defaultValue: true,
//   fn({ hide }: any) {
//     function onKeyDown(event: KeyboardEvent) {
//       if (event.key === 'Escape') {
//         hide();
//       }
//     }

//     let unregisterKeyDown: (() => void) | undefined = undefined;

//     return {
//       onShow() {
//         unregisterKeyDown?.();
//         unregisterKeyDown = GlobalEventBus.getInstance().register(
//           'keydown',
//           onKeyDown,
//         );
//       },
//       onHide() {
//         unregisterKeyDown?.();
//       },
//     };
//   },
// };

function computePosition(target: HTMLElement, popover: HTMLElement) {
  const targetRect = target.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const top = globalThis.window.scrollY + targetRect.top - popoverRect.height;
  const left = globalThis.window.scrollX + targetRect.left +
    targetRect.width / 2 - popoverRect.width / 2;

  return { top, left };
}

function poppy(target: HTMLElement, content: string) {
  const popover = document.createElement('div');
  popover.setAttribute('popover', 'auto');
  popover.setAttribute('id', 'trakt-popover');
  popover.style.position = 'absolute';
  popover.style.margin = '0';
  popover.style.setProperty('position-anchor', '--tooltip-anchor');
  popover.style.setProperty('top', 'auto');
  popover.style.setProperty('bottom', 'anchor(top)');
  popover.style.setProperty('justify-self', 'anchor-center');

  popover.innerHTML = content;

  document.body.appendChild(popover);

  target.setAttribute('popovertarget', 'trakt-popover');
  target.setAttribute('popovertargetaction', 'show');

  popover.showPopover();

  // TODO custom positioning for non chrome
  // const position = computePosition(target, popover);
  // popover.style.top = `${position.top}px`;
  // popover.style.left = `${position.left}px`;
}

export function tooltip(node: HTMLElement, content?: string) {
  // TODO typing issue
  // TODO custom styling

  const title = node.title;

  // const tippyTooltip = tippy(node, {
  //   content: content || title,
  //   interactive: true,
  //   plugins: [hideOnEscape],
  // });

  const removePopover = () => {
    document.getElementById('trakt-popover')?.remove();
  };

  onMount(() => {
    node.style.setProperty('anchor-name', '--tooltip-anchor');
    node.addEventListener('mouseenter', () => {
      poppy(node, content || title);
    });

    node.addEventListener('mouseleave', removePopover);
  });

  return {
    destroy: () => {
      removePopover();
    },
  };
}
