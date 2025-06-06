export function fitFrameToContent(element: HTMLIFrameElement) {
  globalThis.window.addEventListener('message', function (event) {
    console.log('Received message:', event);

    if (event.data.type === 'body_height') {
      const height = event.data.height;
      // element.style.height = `${height}px`;
    }
  });

  return {
    destroy() {
    },
  };
}
