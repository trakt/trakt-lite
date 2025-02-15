<script lang="ts">
  import WatchNowButton from "$lib/components/buttons/watch-now/WatchNowButton.svelte";
  import AirDate from "$lib/components/media/tags/AirDateTag.svelte";
  import InfoTag from "$lib/components/media/tags/InfoTag.svelte";
  import PlaysTag from "$lib/components/media/tags/PlaysTag.svelte";
  import { TagIntlProvider } from "$lib/components/media/tags/TagIntlProvider";
  import RatingList from "$lib/components/summary/RatingList.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import type { EpisodeEntry } from "$lib/requests/models/EpisodeEntry";
  import type { EpisodeStats } from "$lib/requests/models/EpisodeStats";
  import type { MediaEntry } from "$lib/requests/models/MediaEntry";
  import type { MediaRating } from "$lib/requests/models/MediaRating";
  import type { MediaStats } from "$lib/requests/models/MediaStats";
  import type { MediaType } from "$lib/requests/models/MediaType";
  import type { UserProfile } from "$lib/requests/models/UserProfile";
  import type { WatchNowStreaming } from "$lib/requests/models/WatchNowServices";
  import { useWatchNow } from "$lib/stores/useWatchNow";
  import YoutubeButton from "../YoutubeButton.svelte";

  type MediaMetaInfoProps = {
    certification?: string | Nil;
    airDate: Date;
    year: number | Nil;
    ratings: MediaRating;
    stats: MediaStats | EpisodeStats;
    watchers: UserProfile[];
    type: MediaType | "episode";
    media: MediaEntry | EpisodeEntry;
  };

  const {
    certification,
    year,
    ratings,
    stats,
    airDate,
    type,
    media,
  }: MediaMetaInfoProps = $props();

  const { watchNow } = $derived(
    useWatchNow({
      type,
      id: media.id,
    }),
  );

  const isAiredItem = $derived(airDate < new Date());
</script>

{#snippet watchNowButton(
  service: WatchNowStreaming,
  style: "normal" | "action",
)}
  <WatchNowButton mediaTitle={media.title} {service} {style} />
{/snippet}

<div class="trakt-summary-meta">
  <div class="trakt-summary-meta-container">
    <RatingList {ratings} {airDate} />
    <div class="trakt-meta-tags">
      {#if certification}
        <InfoTag>
          {certification}
        </InfoTag>
      {/if}

      {#if year}
        <AirDate i18n={TagIntlProvider} {year} {airDate} />
      {/if}

      <!-- FIXME: re-enable watchers once we have better watching stats -->

      {#if isAiredItem}
        <PlaysTag i18n={TagIntlProvider} plays={stats.plays} />
      {/if}
    </div>
  </div>
  <div class="trakt-summary-watch-container">
    {#if $watchNow?.preferred}
      <RenderFor device={["tablet-lg", "desktop"]} audience="authenticated">
        {@render watchNowButton($watchNow?.preferred, "normal")}
      </RenderFor>
      <RenderFor device={["tablet-sm", "mobile"]} audience="authenticated">
        {@render watchNowButton($watchNow?.preferred, "action")}
      </RenderFor>
    {/if}

    {#if "trailer" in media}
      <YoutubeButton trailer={media.trailer} />
    {/if}
  </div>
</div>

<style>
  .trakt-summary-meta {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
    align-items: center;

    gap: var(--gap-m);
  }

  .trakt-summary-meta-container {
    display: flex;
    flex-direction: column;

    gap: var(--gap-xs);
  }

  .trakt-summary-watch-container,
  .trakt-meta-tags {
    display: flex;
    align-items: center;

    gap: var(--gap-xs);
  }
</style>
