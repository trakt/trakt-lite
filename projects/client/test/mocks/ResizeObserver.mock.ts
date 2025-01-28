(globalThis as Record<string, unknown>).ResizeObserver = class ResizeObserver {
  constructor(
    callback: (
      entries: ResizeObserverEntry[],
      observer: ResizeObserver,
    ) => void,
  ) {
    callback([{
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
      contentRect: new DOMRectReadOnly(),
      target: document.createElement('div'),
    }], this);
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};
