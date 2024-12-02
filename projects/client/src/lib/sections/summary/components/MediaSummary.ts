import type { MovieSummary } from '$lib/requests/queries/movies/movieSummaryQuery.ts';
import type { ShowSummary } from '$lib/requests/queries/shows/showSummaryQuery.ts';

export type MediaSummary = MovieSummary | ShowSummary;
