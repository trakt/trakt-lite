import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePopupHelpers } from './usePopupHelpers.ts';

describe('usePopupHelpers', () => {
  let target: HTMLElement;

  beforeEach(() => {
    target = document.createElement('div');
    vi.spyOn(document.body, 'appendChild');
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 200,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  it('should initialize with null values', () => {
    const { popupTarget } = usePopupHelpers();
    expect(get(popupTarget)).toBeNull();
  });

  it('should create a clone of the popup target', () => {
    const { addHelpers, popupTarget } = usePopupHelpers();
    addHelpers(target);
    const clone = get(popupTarget);

    expect(clone).not.toBeNull();
    expect(clone?.getAttribute('data-popup-state')).toBe('opened');
    expect(clone?.style.zIndex).toBe('calc(var(--layer-menu) + 1)');
    expect(document.body.appendChild).toHaveBeenCalled();
  });

  it('should remove clonse when removing helpers', () => {
    const { addHelpers, removeHelpers, popupTarget } = usePopupHelpers();
    addHelpers(target);

    const clone = get(popupTarget);
    vi.spyOn(clone as HTMLElement, 'remove');

    removeHelpers();

    expect(clone?.remove).toHaveBeenCalled();
    expect(get(popupTarget)).toBeNull();
  });
});
