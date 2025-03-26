import { KbNavigationType } from '$lib/features/kb-navigation/models/KbNavigationType.ts';

export const getNavigatableItems = (list: Element) =>
  Array.from(
    list.querySelectorAll(
      `[data-kb-navigation="${KbNavigationType.Item}"]`,
    ),
  );
