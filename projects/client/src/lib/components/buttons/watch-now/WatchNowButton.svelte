<script lang="ts">
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import DropdownList from "$lib/components/dropdown/DropdownList.svelte";
  import { languageTag } from "$lib/features/i18n/index.ts";
  import type {
    WatchNowPurchase,
    WatchNowService,
  } from "$lib/requests/models/WatchNowServices";
  import type { WatchNowSource } from "$lib/requests/models/WatchNowSources";
  import type { WatchNowButtonIntl } from "./WatchNowButtonIntl";
  import { WatchNowButtonIntlProvider } from "./WatchNowButtonIntlProvider";

  type WatchNowButtonProps = {
    isLoading: boolean;
    mediaTitle: string;
    services: WatchNowService[];
    purchases: WatchNowPurchase[];
    sources: WatchNowSource[];
    i18n?: WatchNowButtonIntl;
  };

  const {
    isLoading,
    mediaTitle,
    services,
    purchases,
    sources,
    i18n = WatchNowButtonIntlProvider,
  }: WatchNowButtonProps = $props();

  const isDisabled = $derived(isLoading || !services);

  const availableServices = $derived(
    services.length > 0 ? services : purchases,
  );

  const getMediaCost = (purchasable: WatchNowPurchase) => {
    const isRentable = Boolean(purchasable.prices.rent);
    const isPurchaseable = Boolean(purchasable.prices.purchase);

    if (!isRentable && !isPurchaseable) {
      return "";
    }

    const price = isRentable
      ? purchasable.prices.rent
      : purchasable.prices.purchase;

    const formattedValue = new Intl.NumberFormat(languageTag(), {
      style: "currency",
      currency: purchasable.currency.toUpperCase(),
    }).format(parseFloat(price!));

    return ` (${formattedValue})`;
  };
  /*
    TODO:
    - source icon (either query buttonpng's from OG, or add SVG's for well known services)
    - 4k tag
    - Add proper tooltips
  */

  /*
    For now we use the title as a quick way to show a tooltip
    The label is used over the title when calculating
    the accessible name (https://www.w3.org/TR/wai-aria/#namecalculation)
  */
  const title = $derived(i18n.title({ title: mediaTitle, isDisabled }));
  /**
   * TODO: @seferturan
   *
   * Let's replace this watch now button with actionable tags on the cover (eg: Netflix, Prime Video, etc.)
   * TV apps should go with actionable button, web and mobile should go with tags on the cover.
   */
  const isEnabled = true;
</script>

{#if isEnabled}
  <div class="watch-now-container">
    <DropdownList
      label={i18n.text()}
      variant="primary"
      style="textured"
      color="purple"
      text="capitalize"
      size="normal"
    >
      {`Watch now on ${availableServices.length} services`}
      {#snippet items()}
        {#each availableServices as service}
          <DropdownItem href={service.link} target="_blank">
            {sources.find((source) => source.source === service.source)?.name}
            {#if "prices" in service}
              {getMediaCost(service as WatchNowPurchase)}
            {/if}
            {#snippet icon()}
              <img
                class="service-icon"
                loading="lazy"
                alt="logo"
                src={sources.find((source) => source.source === service.source)
                  ?.logoUrl ?? ""}
              />
            {/snippet}
          </DropdownItem>
        {/each}
      {/snippet}
    </DropdownList>
  </div>
{/if}

<style>
  .watch-now-container {
    display: flex;

    :global(.trakt-dropdown-list-container) {
      width: 100%;
      display: grid;
    }
  }

  img.service-icon {
    width: auto !important;
    height: 24px !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    object-fit: contain;
    filter: brightness(0);
  }
</style>
