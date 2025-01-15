import { SIMPLE_RATINGS } from '$lib/models/Ratings';

//TODO test
export function mapRatingToSimpleRating(value: number) {
  const sortedRatings = SIMPLE_RATINGS
    .toSorted((a, b) => b.value - a.value);

  for (const rating of sortedRatings) {
    if (value >= rating.value) {
      return rating;
    }
  }
}
