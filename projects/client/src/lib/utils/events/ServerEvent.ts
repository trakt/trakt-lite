type MessageCallbackFn = (data: string) => void;
type ErrorCallbackFn = (error: Error) => void;

type EventType = 'message' | 'error';

export class ServerEvent {
  #controller: AbortController;
  #url: string;
  #headers: Record<string, string>;
  #onMessageCallback: MessageCallbackFn | Nil = null;
  #onErrorCallback: ((error: Error) => void) | null = null;

  constructor(
    url: string,
    headers: Record<string, string>,
    controller: AbortController | null = null,
  ) {
    this.#controller = controller ?? new AbortController();
    this.#url = url;
    this.#headers = headers;
  }

  addEventListener<T extends EventType>(
    event: T,
    callback: T extends 'message' ? MessageCallbackFn : ErrorCallbackFn,
  ): void {
    if (event === 'message') {
      this.#onMessageCallback = callback as MessageCallbackFn;
    } else if (event === 'error') {
      this.#onErrorCallback = callback as ErrorCallbackFn;
    }
  }

  async connect(): Promise<void> {
    try {
      const response = await fetch(this.#url, {
        headers: this.#headers,
        signal: this.#controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              try {
                const response = JSON.parse(data);
                this.#onMessageCallback?.(response);
              } catch {
                /**
                 * If the data cannot be parsed as JSON,
                 * we skip the event.
                 */
                console.warn('Received non-JSON data:', data);
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        this.#onErrorCallback?.(error);
      }
    }
  }

  close(): void {
    this.#controller?.abort();
  }
}
