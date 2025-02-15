<script lang="ts" generics="T extends WatchNowStreaming | WatchNowOnDemand">
  import Link from "$lib/components/link/Link.svelte";
  import type {
    WatchNowOnDemand,
    WatchNowStreaming,
  } from "$lib/requests/models/WatchNowServices";
  import { useWatchNowSources } from "$lib/stores/useWatchNowSources";
  import CollapsableValues from "./CollapsableValues.svelte";
  import { getMediaCost } from "./getMediaCost";

  type WatchNowCategoryServicesProps<T> = {
    title: string;
    services: T[];
  };

  const { title, services }: WatchNowCategoryServicesProps<T> = $props();

  const { sources } = useWatchNowSources();

  const getServiceName = (service: WatchNowOnDemand | WatchNowStreaming) => {
    return (
      $sources.find((s) => s.source === service.source)?.name ?? service.source
    );
  };

  const hasPrice = (
    service: WatchNowOnDemand | WatchNowStreaming,
  ): service is WatchNowOnDemand => {
    if (service.type === "streaming") {
      return false;
    }

    const { rent, purchase } = service.prices;
    return Boolean(rent || purchase);
  };
</script>

<div class="trakt-watch-now-category-services">
  <CollapsableValues category="streaming" values={services}>
    <p class="meta-info secondary">{title}</p>
    {#snippet value(service)}
      <Link href={service.link}>
        <p class="small ellipsis">
          {getServiceName(service)}
          {#if hasPrice(service)}
            {`(${getMediaCost(service)})`}
          {/if}
        </p>
      </Link>
    {/snippet}
  </CollapsableValues>
</div>

<style>
  .trakt-watch-now-category-services {
    :global(.trakt-link) {
      display: flex;
      align-items: center;

      overflow: hidden;

      gap: var(--gap-xs);
    }
  }
</style>
