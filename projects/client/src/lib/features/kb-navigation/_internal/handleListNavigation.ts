import { focusAndScrollIntoView } from '$lib/features/kb-navigation/_internal/focusAndScrollIntoView.ts';
import { getNavigatableItems } from '$lib/features/kb-navigation/_internal/getNavigatableItems.ts';
import { getNextIndex } from '$lib/features/kb-navigation/_internal/getNextIndex.ts';
import { getParentList } from '$lib/features/kb-navigation/_internal/getParentList.ts';
import { KbNavigationType } from '$lib/features/kb-navigation/models/KbNavigationType.ts';

const getElements = (navType: KbNavigationType) =>
  Array.from(document.querySelectorAll(`[data-kb-navigation="${navType}"]`));

export const handleListNavigation = (direction: 'up' | 'down') => {
  const currentList = getParentList();
  if (!currentList) return;

  const lists = getElements(KbNavigationType.List);
  const currentListIndex = lists.indexOf(currentList);
  const newListIndex = getNextIndex(
    currentListIndex,
    lists.length,
    direction === 'down',
  );
  const targetList = lists[newListIndex];

  if (targetList) {
    const currentIndex = currentList
      ? getNavigatableItems(currentList).indexOf(
        document.activeElement as Element,
      )
      : -1;

    const targetItems = getNavigatableItems(targetList);
    const targetElement = targetItems[currentIndex] || targetItems[0];

    if (targetElement) {
      focusAndScrollIntoView(targetElement as HTMLElement);
    }
  }
};
