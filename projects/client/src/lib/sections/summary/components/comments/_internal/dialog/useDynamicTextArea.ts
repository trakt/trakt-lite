import { get, readable, writable } from 'svelte/store';

type CommentContent = {
  hasContent: boolean;
  lineCount: number;
  comment: string;
};

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

// TODO fix long single line comment
export function useDynamicTextArea() {
  const text = writable<CommentContent>({
    hasContent: false,
    lineCount: 0,
    comment: '',
  });

  const autoResizeArea = (textArea: HTMLTextAreaElement) => {
    const handler = () => {
      requestAnimationFrame(() => {
        resizeTextArea(textArea);

        text.set({
          hasContent: textArea.value.trim().length > 0,
          lineCount: textArea.rows,
          comment: textArea.value,
        });
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
    text: readable(get(text), (value) => {
      const unsubscribe = text.subscribe(value);
      return unsubscribe;
    }),
  };
}
