import {
  EpisodeFinaleType,
  EpisodePremiereType,
} from '$lib/requests/models/EpisodeType';

export type PremiereMetadata = {
  type: EpisodePremiereType;
};

export type FinaleMetadata = {
  type: EpisodeFinaleType;
};

export type EpisodeIntl = {
  premiereText: (metadata: PremiereMetadata) => string;
  finaleText: (metadata: FinaleMetadata) => string;
  timestampText: (date: Date) => string;
  durationText: (duration: number) => string;
  remainingText: (remaining: number) => string;
  fullSeasonText: () => string;
};
