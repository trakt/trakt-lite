export type WatchNowService = {
  link: string;
  source: string;
  is4k: boolean;
};

export type WatchNowPurchase = WatchNowService & {
  currency: string;
  prices: {
    rent?: string;
    purchase?: string;
  };
};

export type WatchNowServices = {
  subscriptions: WatchNowService[];
  purchases: WatchNowPurchase[];
};
