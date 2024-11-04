import { builder } from './_internal/builder.ts';
import { calendars } from './calendars/index.ts';
import { checkin } from './checkin/index.ts';
import { oauth } from './oauth/index.ts';

export const traktContract = builder
  .router({
    oauth,
    calendars,
    checkin,
  });