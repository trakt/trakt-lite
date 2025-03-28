import type { ListedMovieResponse, ListedShowResponse } from '@trakt/api';
import { mapToEpisodeCount } from './mapToEpisodeCount.ts';
import { mapToMovieEntry } from './mapToMovieEntry.ts';
import { mapToShowEntry } from './mapToShowEntry.ts';

function mapListDetails(
  listedItem: ListedMovieResponse | ListedShowResponse,
) {
  return {
    id: listedItem.id,
    rank: listedItem.rank,
    notes: listedItem.notes,
    type: listedItem.type,
    listedAt: new Date(listedItem.listed_at),
  };
}

export function mapToShowListItem(
  listedShowResponse: ListedShowResponse,
) {
  return {
    ...mapListDetails(listedShowResponse),
    entry: {
      ...mapToShowEntry(listedShowResponse.show),
      ...mapToEpisodeCount(listedShowResponse.show),
    },
  };
}

export function mapToMovieListItem(
  listedMovieResponse: ListedMovieResponse,
) {
  return {
    ...mapListDetails(listedMovieResponse),
    entry: mapToMovieEntry(listedMovieResponse.movie),
  };
}

export function mapToListItem(
  listedItem: ListedMovieResponse | ListedShowResponse,
) {
  return listedItem.type === 'movie'
    ? mapToMovieListItem(listedItem)
    : mapToShowListItem(listedItem);
}
