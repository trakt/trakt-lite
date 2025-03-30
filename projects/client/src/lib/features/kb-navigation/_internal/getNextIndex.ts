export const getNextIndex = (
  current: number,
  length: number,
  isForward: boolean,
) => {
  if (isForward) {
    return (current + 1) % length;
  }

  if (current === 0) {
    return length - 1;
  }

  return current - 1;
};
