<script lang="ts">
  import Card from "$lib/components/card/Card.svelte";
  import Link from "$lib/components/link/Link.svelte";
  import { KbNavigationType } from "$lib/features/kb-navigation/models/KbNavigationType";
  import type { MediaListSummary } from "$lib/requests/models/MediaListSummary.ts";
  import type { MediaType } from "$lib/requests/models/MediaType.ts";
  import { getListUrl } from "./_internal/getListUrl";
  import ListHeader from "./_internal/ListHeader.svelte";
  import ListPosters from "./_internal/ListPosters.svelte";

  const { list, type }: { list: MediaListSummary; type?: MediaType } = $props();
</script>

<Card
  --width-card="min(var(--width-list-card), 85vw)"
  --height-card="var(--height-list-card)"
>
  <!-- TODO only for androidtv (generic way of making cards clickable?) -->
  <Link href={getListUrl(list, type)} navigationType={KbNavigationType.Item}>
    <div class="trakt-list-summary">
      <ListHeader {list} {type} />
      <ListPosters {list} {type} />
    </div>
  </Link>
</Card>

<style>
  .trakt-list-summary {
    display: flex;
    flex-direction: column;
    gap: var(--gap-s);

    padding: var(--ni-12);

    background-color: color-mix(
      in srgb,
      var(--color-card-background) 40%,
      var(--color-background)
    );
    border-radius: var(--border-radius-m);
  }
</style>
