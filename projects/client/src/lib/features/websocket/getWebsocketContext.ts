import { getContext } from 'svelte';
import { WEBSOCKET_CONTEXT_KEY } from './context.ts';

export function getWebsocketContext() {
  return getContext(WEBSOCKET_CONTEXT_KEY) as {
    socket: WebSocket | null;
    send: (data: string | ArrayBuffer | Blob) => void;
  } | null;
}
