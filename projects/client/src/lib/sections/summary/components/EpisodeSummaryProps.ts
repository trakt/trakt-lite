import type { ActiveWatcher } from '$lib/requests/models/ActiveWatcher.ts';
import type { EpisodeEntry } from '$lib/requests/models/EpisodeEntry.ts';
import type { EpisodeIntl } from '$lib/requests/models/EpisodeIntl.ts';
import type { EpisodeStats } from '$lib/requests/models/EpisodeStats.ts';
import type { MediaEntry } from '$lib/requests/models/MediaEntry.ts';
import type { MediaIntl } from '$lib/requests/models/MediaIntl.ts';
import type { MediaRating } from '$lib/requests/models/MediaRating.ts';
import type { Season } from '$lib/requests/models/Season.ts';
import type { Snippet } from 'svelte';

export type EpisodeSummaryProps = {
  episode: EpisodeEntry;
  show: MediaEntry;
  showIntl: MediaIntl;
  seasons: Season[];
  ratings: MediaRating;
  watchers: ActiveWatcher[];
  stats: EpisodeStats;
  episodeIntl: EpisodeIntl;
  actions?: Snippet;
};
