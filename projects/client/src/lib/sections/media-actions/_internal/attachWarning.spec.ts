import { describe, expect, it, vi } from 'vitest';
import { attachWarning } from './attachWarning.ts';

describe('attachWarning', () => {
  it('should call handler when confirmed', () => {
    const handler = vi.fn();
    const message = 'Are you sure?';
    const wrappedHandler = attachWarning(handler, message);

    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    wrappedHandler();

    expect(globalThis.confirm).toHaveBeenCalledWith(message);
    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler when canceled', () => {
    const handler = vi.fn();
    const message = 'Are you sure?';
    const wrappedHandler = attachWarning(handler, message);

    vi.spyOn(window, 'confirm').mockImplementation(() => false);

    wrappedHandler();

    expect(globalThis.confirm).toHaveBeenCalledWith(message);
    expect(handler).not.toHaveBeenCalled();
  });
});
