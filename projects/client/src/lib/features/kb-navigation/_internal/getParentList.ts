import { KbNavigationType } from '$lib/features/kb-navigation/models/KbNavigationType.ts';

export const getParentList = () =>
  document.activeElement?.closest(
    `[data-kb-navigation="${KbNavigationType.List}"]`,
  );
