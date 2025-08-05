import { renderStore } from '$test/beds/store/renderStore.ts';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { useSearch } from './useSearch.ts';

describe('useSearch', () => {
  it('should initialize with empty results', async () => {
    const { results } = await renderStore(() => useSearch());

    expect(get(results)).toEqual(null);
  });

  it('should return empty results when search term is empty', async () => {
    const { search, results } = await renderStore(() => useSearch());

    await search('', 'media');
    expect(get(results)).toEqual(null);
  });

  it('should return empty results when search string is full of whitespaces', async () => {
    const { search, results } = await renderStore(() => useSearch());

    await search('      ', 'media');
    expect(get(results)).toEqual(null);
  });

  /**
   * TODO: add more scenarios here once I figure out the AbortSignal error in testing
   */
});
