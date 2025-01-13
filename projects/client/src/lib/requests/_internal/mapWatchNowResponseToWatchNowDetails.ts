import type { WatchNowResponse } from '$lib/api.ts';
import type { WatchNowServices } from '../models/WatchNowServices.ts';

export function mapWatchNowResponseToWatchNowDetails(
  response: WatchNowResponse,
  country: string,
): WatchNowServices {
  const data = response[country];
  const subscriptionResponse = data?.subscription ?? [];

  const subscriptions = subscriptionResponse.map((subscription) => {
    return {
      link: `https://${subscription.link}`,
      source: subscription.source,
      is4k: subscription.uhd,
    };
  });

  const purchaseResponse = data?.purchase ?? [];

  const purchases = purchaseResponse.map((purchase) => {
    return {
      link: `https://${purchase.link}`,
      source: purchase.source,
      is4k: purchase.uhd,
      currency: purchase.currency,
      prices: purchase.prices,
    };
  });

  return {
    subscriptions,
    purchases,
  };
}
