import { ShowSiloStatsMappedMock } from '$mocks/data/summary/shows/silo/mapped/ShowSiloStatsMappedMock.ts';
import { ShowSiloResponseMock } from '$mocks/data/summary/shows/silo/response/ShowSiloResponseMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { createQuery } from '@tanstack/svelte-query';
import { describe, expect, it } from 'vitest';
import { showStatsQuery } from './showStatsQuery.ts';

describe('showStatsQuery', () => {
  it('should query stats for Silo (2023)', async () => {
    const result = await runQuery({
      factory: () =>
        createQuery(
          showStatsQuery({ slug: ShowSiloResponseMock.ids.slug }),
        ),
      mapper: (response) => response?.data,
    });

    expect(result).to.deep.equal(ShowSiloStatsMappedMock);
  });
});
