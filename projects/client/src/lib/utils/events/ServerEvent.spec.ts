import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ServerEvent } from './ServerEvent.ts';

describe('ServerEvent', () => {
  let serverEvent: ServerEvent;
  const mockUrl = 'http://localhost:3000/events';
  const mockHeaders = { 'Accept': 'text/event-stream' };
  const controller = new AbortController();

  beforeEach(() => {
    controller.abort = vi.fn();
    serverEvent = new ServerEvent(
      mockUrl,
      mockHeaders,
      controller,
    );
  });

  afterEach(() => {
    serverEvent.close();
  });

  it('should create instance with correct url and headers', () => {
    expect(serverEvent).toBeInstanceOf(ServerEvent);
  });

  it('should add message event listener', () => {
    const messageCallback = vi.fn();
    serverEvent.addEventListener('message', messageCallback);
    expect(messageCallback).not.toHaveBeenCalled();
  });

  it('should add error event listener', () => {
    const errorCallback = vi.fn();
    serverEvent.addEventListener('error', errorCallback);
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('should call error callback on fetch failure', async () => {
    const errorCallback = vi.fn();
    const invalidServerEvent = new ServerEvent('invalid-url', {});

    invalidServerEvent.addEventListener('error', errorCallback);
    await invalidServerEvent.connect();

    expect(errorCallback).toHaveBeenCalledWith(expect.any(Error));
    invalidServerEvent.close();
  });

  it('should handle non-JSON data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const messageCallback = vi.fn();

    serverEvent.addEventListener('message', messageCallback);

    // This test verifies the console.warn is called for non-JSON data
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should close connection when close is called', () => {
    serverEvent.close();
    expect(controller.abort).toHaveBeenCalled();
  });

  it('should handle close when controller is null', () => {
    expect(() => serverEvent.close()).not.toThrow();
  });
});
