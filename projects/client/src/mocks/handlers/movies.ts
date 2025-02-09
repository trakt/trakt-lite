import { http, HttpResponse } from 'msw';

import { MoviesAnticipatedResponseMock } from '../data/movies/response/MoviesAnticipatedResponseMock.ts';
import { MoviesPopularResponseMock } from '../data/movies/response/MoviesPopularResponseMock.ts';
import { MoviesTrendingResponseMock } from '../data/movies/response/MoviesTrendingResponseMock.ts';
import { MediaWatchingResponseMock } from '../data/summary/common/response/MediaWatchingResponseMock.ts';
import { HereticListsResponseMock } from '../data/summary/movies/heretic/response/HereticListsResponseMock.ts';
import { MovieHereticLanguageResponseMock } from '../data/summary/movies/heretic/response/MovieHereticLanguageResponseMock.ts';
import { MovieHereticPeopleResponseMock } from '../data/summary/movies/heretic/response/MovieHereticPeopleResponseMock.ts';
import { MovieHereticRatingsResponseMock } from '../data/summary/movies/heretic/response/MovieHereticRatingsResponseMock.ts';
import { MovieHereticRelatedResponseMock } from '../data/summary/movies/heretic/response/MovieHereticRelatedResponseMock.ts';
import { MovieHereticResponseMock } from '../data/summary/movies/heretic/response/MovieHereticResponseMock.ts';
import { MovieHereticStatsResponseMock } from '../data/summary/movies/heretic/response/MovieHereticStatsResponseMock.ts';
import { MovieHereticWatchNowResponseMock } from '../data/summary/movies/heretic/response/MovieHereticWatchNowResponseMock.ts';
import { MovieStudiosResponseMock } from '../data/summary/movies/heretic/response/MovieStudiosResponseMock.ts';

export const movies = [
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}`,
    () => {
      return HttpResponse.json(MovieHereticResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/translations/*`,
    () => {
      return HttpResponse.json(MovieHereticLanguageResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/ratings`,
    () => {
      return HttpResponse.json(MovieHereticRatingsResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/stats`,
    () => {
      return HttpResponse.json(MovieHereticStatsResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/watching`,
    () => {
      return HttpResponse.json(MediaWatchingResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/studios`,
    () => {
      return HttpResponse.json(MovieStudiosResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/people`,
    () => {
      return HttpResponse.json(MovieHereticPeopleResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.trakt}/watchnow/*`,
    () => {
      return HttpResponse.json(MovieHereticWatchNowResponseMock);
    },
  ),
  http.get(
    'http://localhost/movies/trending*',
    () => {
      return HttpResponse.json(MoviesTrendingResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/related*`,
    () => {
      return HttpResponse.json(MovieHereticRelatedResponseMock);
    },
  ),
  http.get(
    'http://localhost/movies/popular*',
    () => {
      return HttpResponse.json(MoviesPopularResponseMock);
    },
  ),
  http.get(
    'http://localhost/movies/anticipated*',
    () => {
      return HttpResponse.json(MoviesAnticipatedResponseMock);
    },
  ),
  http.get(
    `http://localhost/movies/${MovieHereticResponseMock.ids.slug}/lists/all/popular*`,
    () => {
      return HttpResponse.json(HereticListsResponseMock);
    },
  ),
];
