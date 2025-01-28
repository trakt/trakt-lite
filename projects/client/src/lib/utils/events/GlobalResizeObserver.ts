type ResizeEventHandler = (element: ResizeObserverEntry) => void;

class GlobalResizeObserver {
  private static instance: GlobalResizeObserver;
  private static callbacks: Map<Element, ResizeEventHandler> = new Map();

  private _resizeObserver: ResizeObserver;

  private constructor() {
    // Private constructor to prevent direct instantiation
    this._resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const callback = GlobalResizeObserver.callbacks.get(entry.target);
        if (!callback) {
          return;
        }

        callback(entry);
      });
    });
  }

  public static getInstance(): GlobalResizeObserver {
    if (!GlobalResizeObserver.instance) {
      GlobalResizeObserver.instance = new GlobalResizeObserver();
    }

    return GlobalResizeObserver.instance;
  }

  public observe(
    element: HTMLElement,
    callback: ResizeEventHandler,
  ) {
    if (!GlobalResizeObserver.callbacks.has(element)) {
      GlobalResizeObserver.callbacks.set(element, callback);
      this._resizeObserver.observe(element);
    }

    return () => this.unobserve(element);
  }

  private unobserve(element: HTMLElement) {
    if (!GlobalResizeObserver.callbacks.has(element)) {
      return;
    }

    GlobalResizeObserver.callbacks.delete(element);
    this._resizeObserver.unobserve(element);
  }
}

export { GlobalResizeObserver };
