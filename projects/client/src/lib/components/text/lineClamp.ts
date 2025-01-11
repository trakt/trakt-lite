import { NOOP_FN } from '$lib/utils/constants';
import type { Writable } from 'svelte/store';
import { GlobalEventBus } from '../../utils/events/GlobalEventBus';

type LineClampProps = {
  lines: number;
  isClamped?: Writable<boolean>;
};

export function lineClamp(node: HTMLElement, {
  lines,
  isClamped,
}: LineClampProps) {
  node.style.setProperty('display', '-webkit-box');
  node.style.setProperty('-webkit-line-clamp', String(lines));
  node.style.setProperty('-webkit-box-orient', 'vertical');
  node.style.setProperty('line-clamp', String(lines));
  node.style.setProperty('overflow', 'hidden');

  const isObserved = isClamped !== undefined;

  const computeClamped = () => {
    isClamped?.set(node.scrollHeight > node.clientHeight);
  };

  const cleanup = isObserved
    ? GlobalEventBus
      .getInstance()
      .register('resize', computeClamped)
    : NOOP_FN;

  computeClamped();

  return {
    destroy() {
      node.style.removeProperty('display');
      node.style.removeProperty('-webkit-line-clamp');
      node.style.removeProperty('-webkit-box-orient');
      node.style.removeProperty('line-clamp');
      node.style.removeProperty('overflow');

      cleanup();
    },
    update({ lines: newLines }: LineClampProps) {
      node.style.setProperty('-webkit-line-clamp', String(newLines));
      node.style.setProperty('line-clamp', String(newLines));
      computeClamped();
    },
  };
}
