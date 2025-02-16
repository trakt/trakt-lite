import { GlobalEventBus } from '$lib/utils/events/GlobalEventBus.ts';
import tippy from 'tippy.js';

//https://atomiks.github.io/tippyjs/v6/plugins/#hideonesc
const hideOnEscape = {
  name: 'hideOnEscape',
  defaultValue: true,
  fn({ hide }: any) {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        hide();
      }
    }

    let unregisterKeyDown: (() => void) | undefined = undefined;

    return {
      onShow() {
        unregisterKeyDown?.();
        unregisterKeyDown = GlobalEventBus.getInstance().register(
          'keydown',
          onKeyDown,
        );
      },
      onHide() {
        unregisterKeyDown?.();
      },
    };
  },
};

export function tooltip(node: HTMLElement, content?: string) {
  // TODO typing issue
  // TODO custom styling

  const title = node.title;

  const tippyTooltip = tippy(node, {
    content: content || title,
    interactive: true,
    plugins: [hideOnEscape],
  });

  return {
    destroy: () => tippyTooltip.destroy(),
  };
}
