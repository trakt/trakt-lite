import { MovieHereticResponseMock } from '$mocks/data/summary/movies/heretic/response/MovieHereticResponseMock.ts';
import type { RecommendedMovieResponse } from '@trakt/api';

export const RecommendedMoviesResponseMock: RecommendedMovieResponse = [
  {
    ...MovieHereticResponseMock,
    'favorited_by': [],
    'recommended_by': [],
  },
];
