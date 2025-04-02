import { PORTAL_UNDERLAY_ID } from './constants.ts';

export const createUnderlay = () => {
  const underlay = document.createElement('div');

  underlay.id = PORTAL_UNDERLAY_ID;

  underlay.style.position = 'fixed';
  underlay.style.top = '0';
  underlay.style.left = '0';
  underlay.style.width = '100%';
  underlay.style.height = '100%';

  underlay.style.zIndex = 'calc(var(--layer-menu) - 1)';

  return underlay;
};
