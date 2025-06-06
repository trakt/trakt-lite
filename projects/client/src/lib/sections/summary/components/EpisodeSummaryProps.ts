import type { EpisodeEntry } from '$lib/requests/models/EpisodeEntry.ts';
import type { EpisodeIntl } from '$lib/requests/models/EpisodeIntl.ts';
import type { MediaCrew } from '$lib/requests/models/MediaCrew.ts';
import type { MediaEntry } from '$lib/requests/models/MediaEntry.ts';
import type { MediaIntl } from '$lib/requests/models/MediaIntl.ts';
import type { Season } from '$lib/requests/models/Season.ts';
import type { StreamOn } from '$lib/requests/models/StreamOn.ts';
import type { Snippet } from 'svelte';

export type EpisodeSummaryProps = {
  episode: EpisodeEntry;
  show: MediaEntry;
  showIntl: MediaIntl;
  seasons: Season[];
  episodeIntl: EpisodeIntl;
  crew: MediaCrew;
  actions?: Snippet;
  streamOn?: StreamOn;
};
