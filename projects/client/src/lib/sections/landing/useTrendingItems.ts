import { useQuery } from '$lib/features/query/useQuery.ts';
import { shuffle } from '$lib/utils/array/shuffle.ts';
import { derived } from 'svelte/store';
import {
  movieTrendingQuery,
} from '../../requests/queries/movies/movieTrendingQuery.ts';
import {
  showTrendingQuery,
} from '../../requests/queries/shows/showTrendingQuery.ts';

const RANDOM_SHOW_COUNT = 2;

export function useTrendingItems() {
  const trendingShows = useQuery(showTrendingQuery());
  const trendingMovies = useQuery(movieTrendingQuery());

  return {
    shows: derived(
      trendingShows,
      ($shows) =>
        shuffle($shows.data?.entries ?? []).slice(0, RANDOM_SHOW_COUNT),
    ),
    //TODO replace with episode
    show: derived(
      trendingShows,
      ($shows) => shuffle($shows.data?.entries ?? []).at(0),
    ),
    movie: derived(
      trendingMovies,
      ($movies) => shuffle($movies.data?.entries ?? []).at(0),
    ),
  };
}
