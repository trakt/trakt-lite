import type { StudioResponse } from '@trakt/api';
import type { MediaStudio } from '../models/MediaStudio.ts';

export function mapToMediaStudio(
  studio: StudioResponse,
): MediaStudio {
  return {
    name: studio.name,
    country: studio.country,
    ids: {
      slug: studio.ids.slug,
    },
  };
}
