import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GlobalResizeObserver } from './GlobalResizeObserver';

describe('GlobalResizeObserver', () => {
  let element: HTMLElement;
  const observeFn = vi.fn();
  const unobserveFn = vi.fn();

  beforeEach(() => {
    element = document.createElement('div');

    vi
      .spyOn(globalThis, 'ResizeObserver')
      .mockImplementation(() => ({
        observe: observeFn,
        unobserve: unobserveFn,
        disconnect: vi.fn(),
      }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should observe an element', () => {
    const callback = vi.fn();

    GlobalResizeObserver.getInstance().observe(element, callback);

    expect(observeFn).toHaveBeenCalled();
  });

  it('should not observe the same element twice', () => {
    const callback = vi.fn();

    GlobalResizeObserver.getInstance().observe(element, callback);
    GlobalResizeObserver.getInstance().observe(element, callback);

    expect(observeFn).toHaveBeenCalledTimes(1);
  });

  it('should unobserve an element', () => {
    const callback = vi.fn();

    const unobserve = GlobalResizeObserver.getInstance().observe(
      element,
      callback,
    );
    unobserve();

    expect(unobserveFn).toHaveBeenCalledWith(element);
  });

  it('should not unobserve an element twice', () => {
    const callback = vi.fn();

    const unobserve = GlobalResizeObserver.getInstance().observe(
      element,
      callback,
    );
    unobserve();
    unobserve();

    expect(unobserveFn).toHaveBeenCalledTimes(1);
  });
});
