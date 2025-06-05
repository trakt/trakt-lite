import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { safeLocalStorage } from '../../../utils/storage/safeStorage.ts';
import { type Identity, useOrderedArray } from './useOrderedArray.ts';

export type DailyOrderArrayOptions<T> = {
  key: string;
  getId: (item: T) => Identity;
};

function getTodayKey() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime().toString();
}

function getCachedOrder(key: string): Record<string, Identity[]> {
  const stored = safeLocalStorage.getItem(key);
  return stored ? JSON.parse(stored) : {};
}

function saveCachedOrder(key: string, ids: Identity[]) {
  if (!browser) {
    return;
  }

  const today = getTodayKey();

  safeLocalStorage.setItem(key, JSON.stringify({ [today]: ids }));
}

export function useDailyOrderedArray<T>(
  { key, getId }: DailyOrderArrayOptions<T>,
) {
  const today = getTodayKey();
  const cached = getCachedOrder(key);
  const ordered = useOrderedArray({ getId, order: cached[today] });

  const set = (update: Array<T>) => {
    if (update.length === 0) {
      ordered.set([]);
      return;
    }

    const currentList = get(ordered.list);
    const currentOrder = currentList.length > 0
      ? currentList.map(getId)
      : cached[today];

    ordered.set(update, currentOrder);
    const finalList = get(ordered.list);
    saveCachedOrder(key, finalList.map(getId));
  };

  return {
    list: ordered.list,
    set,
  };
}
