<script lang="ts">
  import { browser } from "$app/environment";
  import { getAuthContext } from "$lib/features/auth/stores/getAuthContext.ts";
  import { onDestroy, setContext } from "svelte";
  import { WEBSOCKET_CONTEXT_KEY } from "./context.ts";

  let socket: WebSocket | null = null;
  const { token } = getAuthContext();

  function cleanupSocket() {
    if (socket) {
      try {
        socket.close();
      } catch (e) {
        // ignore
      }
      socket = null;
    }
  }

  function createConnection(token: string | null | undefined) {
    if (!browser) return;

    // close existing connection
    cleanupSocket();

    if (!token) {
      // expose null socket in context
      setContext(WEBSOCKET_CONTEXT_KEY, { socket: null, send: () => {} });
      return;
    }

    const url = `wss://db0xjc18bh.execute-api.us-east-1.amazonaws.com/prod?token=${encodeURIComponent(
      token,
    )}`;

    socket = new WebSocket(url);

    // minimal wrapper exposed via context
    const ctx = {
      socket,
      send: (data: string | ArrayBuffer | Blob) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(data as any);
        }
      },
    };

    setContext(WEBSOCKET_CONTEXT_KEY, ctx);

    socket.addEventListener("close", () => {
      // clear context socket on close
      setContext(WEBSOCKET_CONTEXT_KEY, { socket: null, send: () => {} });
    });
  }

  createConnection($token?.value);
  onDestroy(cleanupSocket);
</script>

<slot />
