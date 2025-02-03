import { ShowSiloMappedMock } from '$mocks/data/summary/shows/silo/mapped/ShowSiloMappedMock.ts';
import { ShowSiloSeasonEpisodesMappedMock } from '$mocks/data/summary/shows/silo/mapped/ShowSiloSeasonEpisodesMappedMock.ts';
import { ShowSiloSeasonEpisodesResponseMock } from '$mocks/data/summary/shows/silo/response/ShowSiloSeasonEpisodesResponseMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { createQuery } from '@tanstack/svelte-query';
import { describe, expect, it } from 'vitest';
import { showSeasonEpisodesQuery } from './showSeasonEpisodesQuery.ts';

describe('showSeasonEpisodesQuery', () => {
  it('should query season episodes for Silo (2023)', async () => {
    const result = await runQuery({
      factory: () =>
        createQuery(
          showSeasonEpisodesQuery({
            slug: ShowSiloMappedMock.slug,
            season: ShowSiloSeasonEpisodesResponseMock[0].season,
          }),
        ),
      mapper: (response) => response?.data,
    });

    expect(result).to.deep.equal(ShowSiloSeasonEpisodesMappedMock);
  });
});
