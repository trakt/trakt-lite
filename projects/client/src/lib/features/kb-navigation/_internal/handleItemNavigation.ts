import { focusAndScrollIntoView } from '$lib/features/kb-navigation/_internal/focusAndScrollIntoView.ts';
import { getNavigatableItems } from '$lib/features/kb-navigation/_internal/getNavigatableItems.ts';
import { getNextIndex } from '$lib/features/kb-navigation/_internal/getNextIndex.ts';
import { getParentList } from '$lib/features/kb-navigation/_internal/getParentList.ts';

export const handleItemNavigation = (direction: 'left' | 'right') => {
  const currentList = getParentList();
  if (!currentList) return;

  const items = getNavigatableItems(currentList);
  const currentIndex = items.indexOf(document.activeElement as Element);
  const newIndex = getNextIndex(
    currentIndex,
    items.length,
    direction === 'right',
  );
  const targetItem = items[newIndex];

  if (targetItem) {
    focusAndScrollIntoView(targetItem as HTMLElement);
  }
};
