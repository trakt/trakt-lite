import { focusAndScrollIntoView } from '$lib/features/kb-navigation/_internal/focusAndScrollIntoView.ts';
import { getNavigatableItems } from '$lib/features/kb-navigation/_internal/getNavigatableItems.ts';
import { getNextIndex } from '$lib/features/kb-navigation/_internal/getNextIndex.ts';
import { getParentList } from '$lib/features/kb-navigation/_internal/getParentList.ts';
import { KbNavigationType } from '$lib/features/kb-navigation/models/KbNavigationType.ts';

const getElements = (navTypes: KbNavigationType[]) =>
  Array.from(
    document.querySelectorAll(
      navTypes.map((navType) => `[data-kb-navigation="${navType}"]`).join(','),
    ),
  );

const navigateToNextList = (currentList: Element, direction: 'up' | 'down') => {
  const lists = getElements([KbNavigationType.List, KbNavigationType.Grid]);
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

    // TODO if navigating into a grid, it should go to the bottom row
    const targetItems = getNavigatableItems(targetList);
    const targetElement = targetItems[currentIndex] || targetItems[0];

    if (targetElement) {
      focusAndScrollIntoView(targetElement as HTMLElement);
    }
  }
};

const navigateInGrid = (currentList: Element, direction: 'up' | 'down') => {
  const items = getNavigatableItems(currentList);
  const currentItem = document.activeElement as Element;
  const currentIndex = items.indexOf(currentItem);

  // TODO something more robust & better
  const columns = Math.floor(
    currentList.getBoundingClientRect().width /
      items[0].getBoundingClientRect().width,
  ) - 1;
  const nextIndex = currentIndex + (direction === 'down' ? columns : -columns);

  if (nextIndex >= 0 && nextIndex < items.length) {
    focusAndScrollIntoView(items[nextIndex] as HTMLElement);
  } else {
    navigateToNextList(currentList, direction);
  }
};

export const handleListNavigation = (direction: 'up' | 'down') => {
  const currentList = getParentList();
  if (!currentList) return;

  const isGridList =
    currentList.getAttribute('data-kb-navigation') === KbNavigationType.Grid;

  isGridList
    ? navigateInGrid(currentList, direction)
    : navigateToNextList(currentList, direction);
};
