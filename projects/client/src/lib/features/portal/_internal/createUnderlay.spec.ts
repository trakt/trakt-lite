import { describe, expect, it } from 'vitest';
import { PORTAL_UNDERLAY_ID } from './constants.ts';
import { createUnderlay } from './createUnderlay.ts';

describe('util: createUnderlay', () => {
  it('should create an underlay', () => {
    const underlay = createUnderlay();

    expect(underlay).toBeInstanceOf(HTMLDivElement);

    expect(underlay.style.position).toEqual('fixed');
    expect(underlay.style.top).toEqual('0px');
    expect(underlay.style.left).toEqual('0px');
    expect(underlay.style.width).toEqual('100%');
    expect(underlay.style.height).toEqual('100%');

    expect(underlay.id).toEqual(PORTAL_UNDERLAY_ID);
  });
});
