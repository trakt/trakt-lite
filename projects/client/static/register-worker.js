if ('serviceWorker' in navigator) {
  globalThis.addEventListener('load', () => {
    globalThis.addEventListener('beforeinstallprompt', (event) => {
      globalThis.install = event;
    });

    navigator.serviceWorker.register(`/service-worker.js?v=${Date.now()}`, {
      scope: '/',
    });
  });
}
