export const focusAndScrollIntoView = (element: HTMLElement) => {
  element.focus();
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
};
