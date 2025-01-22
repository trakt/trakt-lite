import { defineQuery } from '$lib/features/query/defineQuery.ts';
import { MediaStudioSchema } from '$lib/requests/models/MediaStudio.ts';
import { api, type ApiParams } from '../../_internal/api.ts';
import { mapStudioResponseToMediaStudio } from '../../_internal/mapStudioResponseToMediaStudio.ts';

type ShowStudiosParams = {
  slug: string;
} & ApiParams;

const showStudiosRequest = (
  { fetch, slug }: ShowStudiosParams,
) =>
  api({ fetch })
    .shows
    .studios({
      params: {
        id: slug,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch show studios');
      }

      return response.body;
    });

export const showStudiosQuery = await defineQuery({
  key: 'showStudios',
  invalidations: [],
  dependencies: (params) => [params.slug],
  request: showStudiosRequest,
  mapper: (body) => body.map(mapStudioResponseToMediaStudio),
  schema: MediaStudioSchema.array(),
});
