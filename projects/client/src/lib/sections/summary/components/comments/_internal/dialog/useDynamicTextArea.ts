import { writable } from 'svelte/store';

export const MIN_ROWS = 1;
const MAX_ROWS = 5;

function increaseRows(textArea: HTMLTextAreaElement) {
  if (textArea.rows >= MAX_ROWS) {
    return;
  }

  textArea.rows += 1;
}

function decreaseRows(textArea: HTMLTextAreaElement) {
  while (textArea.rows > MIN_ROWS) {
    textArea.rows -= 1;

    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.rows += 1;
      break;
    }
  }
}

function resizeTextArea(textArea: HTMLTextAreaElement) {
  const isOverflowing = textArea.scrollHeight > textArea.clientHeight;

  if (isOverflowing) {
    increaseRows(textArea);
    return;
  }

  decreaseRows(textArea);
}

export function useDynamicTextArea() {
  const hasContent = writable(false);

  const autoResizeArea = (textArea: HTMLTextAreaElement) => {
    const handler = () => {
      requestAnimationFrame(() => {
        resizeTextArea(textArea);

        hasContent.set(textArea.value.trim().length > 0);
      });
    };

    textArea.addEventListener('input', handler);

    return {
      destroy() {
        textArea.removeEventListener('input', handler);
      },
    };
  };

  return {
    autoResizeArea,
    hasContent,
  };
}
