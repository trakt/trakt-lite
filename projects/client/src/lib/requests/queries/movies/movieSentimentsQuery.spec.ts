import { MovieHereticMappedMock } from '$mocks/data/summary/movies/heretic/mapped/MovieHereticMappedMock.ts';
import { MovieHereticSentimentsMappedMock } from '$mocks/data/summary/movies/heretic/mapped/movieHereticSentimentsMappedMock.ts';
import { runQuery } from '$test/beds/query/runQuery.ts';
import { createQuery } from '@tanstack/svelte-query';
import { describe, expect, it } from 'vitest';
import { movieSentimentsQuery } from './movieSentimentsQuery.ts';

describe('movieSentimentsQuery', () => {
  it('should query for movie sentiments', async () => {
    const result = await runQuery({
      factory: () =>
        createQuery(
          movieSentimentsQuery({ slug: MovieHereticMappedMock.slug }),
        ),
      mapper: (response) => response?.data,
    });

    expect(result).to.deep.equal(MovieHereticSentimentsMappedMock);
  });
});
