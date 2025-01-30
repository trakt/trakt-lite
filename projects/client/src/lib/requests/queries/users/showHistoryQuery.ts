import type { HistoryShowsResponse } from '$lib/api.ts';
import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { extractPageMeta } from '$lib/requests/_internal/extractPageMeta';
import { mapEpisodeResponseToEpisodeEntry } from '$lib/requests/_internal/mapEpisodeResponseToEpisodeEntry.ts';
import { mapShowResponseToShowSummary } from '$lib/requests/_internal/mapShowResponseToShowSummary.ts';
import { api, type ApiParams } from '$lib/requests/api.ts';
import { InvalidateAction } from '$lib/requests/models/InvalidateAction.ts';
import { PaginatableSchemaFactory } from '$lib/requests/models/Paginatable';
import { time } from '$lib/utils/timing/time';
import { z } from 'zod';
import { EpisodeEntrySchema } from '../../models/EpisodeEntry';
import { ShowEntrySchema } from '../../models/ShowEntry';

type ShowHistoryParams = {
  startDate: Date;
  endDate: Date;
  limit: number;
  page?: number;
} & ApiParams;

const HistoryShowSchema = z.object({
  id: z.number(),
  watchedAt: z.date(),
  show: ShowEntrySchema,
  episode: EpisodeEntrySchema,
  type: z.literal('show'),
});
export type HistoryShow = z.infer<typeof HistoryShowSchema>;

const showHistoryRequest = (
  { fetch, startDate, endDate, limit, page = 1 }: ShowHistoryParams,
) =>
  api({ fetch })
    .users
    .history
    .shows({
      params: {
        id: 'me',
      },
      query: {
        extended: 'full,cloud9',
        start_at: startDate.toISOString(),
        end_at: endDate.toISOString(),
        limit,
        page,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch shows history');
      }

      return response;
    });

const mapResponseToHistory = (
  historyShow: HistoryShowsResponse,
) => ({
  id: historyShow.id,
  watchedAt: new Date(historyShow.watched_at),
  show: mapShowResponseToShowSummary(historyShow.show),
  episode: mapEpisodeResponseToEpisodeEntry(historyShow.episode),
  type: 'show' as const,
});

export const showHistoryQuery = defineQuery({
  key: 'showHistory',
  invalidations: [InvalidateAction.MarkAsWatched('show')],
  dependencies: (params: ShowHistoryParams) => [
    params.startDate,
    params.endDate,
    params.limit,
    params.page,
  ],
  request: showHistoryRequest,
  mapper: (response) => ({
    entries: response.body.map(mapResponseToHistory),
    page: extractPageMeta(response.headers),
  }),
  schema: PaginatableSchemaFactory(HistoryShowSchema),
  ttl: time.hours(6),
});
