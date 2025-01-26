import { useQuery } from '$lib/features/query/useQuery';
import { showPeopleQuery } from '$lib/requests/queries/shows/showPeopleQuery.ts';
import { showRatingQuery } from '$lib/requests/queries/shows/showRatingQuery.ts';
import { showSeasonsQuery } from '$lib/requests/queries/shows/showSeasonsQuery.ts';
import { showStatsQuery } from '$lib/requests/queries/shows/showStatsQuery.ts';
import { showStudiosQuery } from '$lib/requests/queries/shows/showStudiosQuery.ts';
import { showWatchersQuery } from '$lib/requests/queries/shows/showWatchersQuery.ts';
import { time } from '$lib/utils/timing/time.ts';
import { derived } from 'svelte/store';

export function useShowDetails(slug: string) {
  const ratings = useQuery({
    ...showRatingQuery({ slug }),
    staleTime: time.days(1),
  });

  const stats = useQuery({
    ...showStatsQuery({ slug }),
    staleTime: time.minutes(30),
  });

  const watchers = useQuery({
    ...showWatchersQuery({ slug }),
    staleTime: time.minutes(5),
  });

  const studios = useQuery({
    ...showStudiosQuery({ slug }),
    staleTime: time.days(1),
  });

  const crew = useQuery({
    ...showPeopleQuery({ slug }),
    staleTime: time.days(1),
  });

  const seasons = useQuery({
    ...showSeasonsQuery({ slug }),
    staleTime: time.days(1),
  });

  const queries = [
    ratings,
    stats,
    watchers,
    studios,
    crew,
    seasons,
  ];

  const isLoading = derived(
    queries,
    ($queries) => $queries.some((query) => query.isPending),
  );

  return {
    isLoading,
    ratings: derived(ratings, ($ratings) => $ratings.data),
    stats: derived(stats, ($stats) => $stats.data),
    watchers: derived(watchers, ($watchers) => $watchers.data),
    studios: derived(studios, ($studios) => $studios.data),
    crew: derived(crew, ($crew) => $crew.data),
    seasons: derived(
      seasons,
      ($seasons) => $seasons.data,
    ),
  };
}
