enum SimpleRating {
  Bad = 'bad',
  Good = 'good',
  Great = 'great',
}

export type Rating = {
  value: number;
  simple: SimpleRating;
};

//TODO refactor; make exhaustive
export const SIMPLE_RATINGS: Rating[] = [
  {
    value: 3,
    simple: SimpleRating.Bad,
  },
  {
    value: 7,
    simple: SimpleRating.Good,
  },
  {
    value: 10,
    simple: SimpleRating.Great,
  },
] as const;
