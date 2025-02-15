import { useQuery } from '$lib/features/query/useQuery.ts';
import { movieHistoryQuery } from '$lib/requests/queries/users/movieHistoryQuery.ts';
import { showHistoryQuery } from '$lib/requests/queries/users/showHistoryQuery.ts';
import { getPastMonthRange } from '$lib/utils/date/getPastMonthRange.ts';
import { derived } from 'svelte/store';

// TODO: add fetchAllPages or something
const HISTORY_LIMIT = 1000;

export function useHistory() {
  const params = {
    limit: HISTORY_LIMIT,
    ...getPastMonthRange(new Date()),
  };

  const movies = useQuery(movieHistoryQuery(params));
  const shows = useQuery(showHistoryQuery(params));

  return {
    historyMovies: derived(movies, ($movies) => $movies.data?.entries),
    historyShows: derived(shows, ($shows) => $shows.data?.entries),
  };
}
