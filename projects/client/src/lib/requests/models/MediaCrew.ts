import type { Job } from '@trakt/api';
import type { CastMember } from './castMember';

//TODO extract
export type CrewMember = {
  jobs: Job[];
  name: string;
};

export type MediaCrew = {
  directors: CrewMember[];
  writers: CrewMember[];
  cast: CastMember[];
};
