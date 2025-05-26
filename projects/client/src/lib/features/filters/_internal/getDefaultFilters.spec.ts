import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FilterKey } from '../models/Filter.ts';
import { STORED_FILTERS_KEY } from '../useStoredFilters.ts';
import { DEFAULT_TV_FILTERS } from './constants.ts';
import { getDefaultFilters } from './getDefaultFilters.ts';

describe('getDefaultFilters', () => {
  const filters: Array<[string, string]> = [
    [FilterKey.Genres, 'action'],
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the stored filters', () => {
    localStorage.setItem(STORED_FILTERS_KEY, JSON.stringify(filters));
    expect(getDefaultFilters()).toEqual(filters);
  });

  it('should return undefined if there is nothing stored', () => {
    expect(getDefaultFilters()).toBeUndefined();
  });

  it('should return the default filters for tv', () => {
    const platformSpy = vi.spyOn(globalThis.navigator, 'userAgent', 'get');
    platformSpy.mockReturnValue('android tv');
    expect(getDefaultFilters()).toEqual(DEFAULT_TV_FILTERS);
  });

  it('should return user stored values over defaults', () => {
    const platformSpy = vi.spyOn(globalThis.navigator, 'userAgent', 'get');
    platformSpy.mockReturnValue('android tv');

    localStorage.setItem(STORED_FILTERS_KEY, JSON.stringify(filters));

    expect(getDefaultFilters()).toEqual(filters);
  });
});
