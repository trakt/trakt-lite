import { EpisodeSiloMappedMock } from '$mocks/data/summary/episodes/silo/mapped/EpisodeSiloMappedMock.ts';
import { EpisodeSiloStreamingServiceOptionsMappedMock } from '$mocks/data/summary/episodes/silo/mapped/EpisodeSiloStreamingServiceOptionsMappedMock.ts';
import { ShowSiloMappedMock } from '$mocks/data/summary/shows/silo/mapped/ShowSiloMappedMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { createQuery } from '@tanstack/svelte-query';
import { describe, expect, it } from 'vitest';
import { streamEpisodeQuery } from './streamEpisodeQuery.ts';

describe('streamEpisodeQuery', () => {
  it('should query for Silo (2023)', async () => {
    const result = await runQuery({
      factory: () =>
        createQuery(
          streamEpisodeQuery({
            id: ShowSiloMappedMock.slug,
            season: EpisodeSiloMappedMock.season,
            episode: EpisodeSiloMappedMock.number,
            country: 'us',
          }),
        ),
      mapper: (response) => response?.data,
    });

    expect(result).to.deep.equal(EpisodeSiloStreamingServiceOptionsMappedMock);
  });
});
