import { EpisodeSiloResponseMock } from '$mocks/data/summary/episodes/silo/response/EpisodeSiloResponseMock.ts';
import { ShowSiloResponseMock } from '$mocks/data/summary/shows/silo/response/ShowSiloResponseMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { createQuery } from '@tanstack/svelte-query';
import { describe, expect, it } from 'vitest';
import { EpisodeSiloMappedMock } from '../../../../mocks/data/summary/episodes/silo/mapped/EpisodeSiloMappedMock.ts';
import { episodeSummaryQuery } from './episodeSummaryQuery.ts';

describe('episodeSummaryQuery', () => {
  it('should query for episode summary', async () => {
    const result = await runQuery({
      factory: () =>
        createQuery(
          episodeSummaryQuery({
            slug: ShowSiloResponseMock.ids.slug,
            season: EpisodeSiloResponseMock.season,
            episode: EpisodeSiloResponseMock.number,
          }),
        ),
      mapper: (response) => response?.data,
    });

    expect(result).to.deep.equal(EpisodeSiloMappedMock);
  });
});
