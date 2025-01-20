import { afterEach, describe, expect, it, vi } from 'vitest';
import { mobileAppleDeviceTriggerHack } from './mobileAppleDeviceTriggerHack';

describe('mobileAppleDeviceTriggerHack', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should trigger click for mobile apple touch events', () => {
    const platformSpy = vi.spyOn(globalThis.navigator, 'platform', 'get');
    platformSpy.mockReturnValue('iPhone');

    const node = document.createElement('button');
    let clickCount = 0;
    node.addEventListener('click', () => clickCount++);

    const action = mobileAppleDeviceTriggerHack(node);

    const touchEvent = new Event('pointerup', {
      bubbles: true,
    });
    Object.defineProperty(touchEvent, 'pointerType', { value: 'touch' });

    node.dispatchEvent(touchEvent);

    expect(clickCount).toBe(1);

    action.destroy();
  });

  it('should NOT trigger click for other devices', () => {
    const node = document.createElement('button');
    let clickCount = 0;
    node.addEventListener('click', () => clickCount++);

    const action = mobileAppleDeviceTriggerHack(node);

    const mouseEvent = new Event('pointerup', {
      bubbles: true,
    });
    Object.defineProperty(mouseEvent, 'pointerType', { value: 'mouse' });

    node.dispatchEvent(mouseEvent);

    expect(clickCount).toBe(0);

    action.destroy();
  });

  it('should cleanup listeners on destroy', () => {
    const node = document.createElement('button');
    let clickCount = 0;

    const action = mobileAppleDeviceTriggerHack(node);
    node.addEventListener('click', () => clickCount++);

    action.destroy();

    const touchEvent = new Event('pointerup', {
      bubbles: true,
    });
    Object.defineProperty(touchEvent, 'pointerType', { value: 'touch' });

    node.dispatchEvent(touchEvent);

    expect(clickCount).toBe(0);
  });

  it('should NOT trigger click for non-HTMLElement targets', () => {
    const node = document.createElement('button');
    let clickCount = 0;
    node.addEventListener('click', () => clickCount++);

    const action = mobileAppleDeviceTriggerHack(node);

    const touchEvent = new Event('pointerup', {
      bubbles: true,
    });
    Object.defineProperty(touchEvent, 'pointerType', { value: 'touch' });
    Object.defineProperty(touchEvent, 'target', { value: {} });

    node.dispatchEvent(touchEvent);

    expect(clickCount).toBe(0);

    action.destroy();
  });
});
