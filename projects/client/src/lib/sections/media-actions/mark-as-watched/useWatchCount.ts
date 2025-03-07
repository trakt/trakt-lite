import { useUser } from '$lib/features/auth/stores/useUser.ts';
import type { MediaInput } from '$lib/models/MediaInput.ts';
import { derived } from 'svelte/store';

type UseWatchCountProps = MediaInput;

// TODO relocate
export function useWatchCount(props: UseWatchCountProps) {
  const { history } = useUser();

  const watchCount = derived(
    history,
    ($history) => {
      if (!$history) {
        return 0;
      }

      switch (props.type) {
        case 'movie':
          return $history.movies.get(props.media.id)?.plays ?? 0;
        case 'show': {
          return $history.shows.get(props.media.id)?.plays ?? 0;
        }
        case 'episode': {
          const show = $history.shows.get(props.media.id);
          const episode = show?.episodes.find(
            (e) =>
              e.season === props.episode.season &&
              e.episode === props.episode.number,
          );

          return episode?.plays ?? 0;
        }
      }
    },
  );

  return { watchCount };
}
