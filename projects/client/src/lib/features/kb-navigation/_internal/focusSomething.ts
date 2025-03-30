export function focusSomething() {
  if (document.activeElement && document.activeElement !== document.body) {
    return;
  }

  const firstNavigableElement = document.querySelector(
    '[data-kb-navigation="item"]',
  );
  if (firstNavigableElement instanceof HTMLElement) {
    firstNavigableElement.focus();
  }
}
