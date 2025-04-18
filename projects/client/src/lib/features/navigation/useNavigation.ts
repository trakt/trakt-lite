import { goto } from '$app/navigation';
import { page } from '$app/state';
import { dpadController } from '$lib/features/navigation/_internal/dpadController.ts';
import type { DeviceType } from '$lib/models/DeviceType.ts';
import { assertDefined } from '$lib/utils/assert/assertDefined.ts';
import { getContext, setContext } from 'svelte';
import { get, type Readable, readable } from 'svelte/store';

const NAVIGATION_CONTEXT_KEY = Symbol('navigation');
const PARAM_NAME = 'navigation';
const DPAD_REF = 'd-pad';

type NavigationType = 'default' | 'dpad';
type Controller = (node: HTMLElement) => void;
type NavigationContextData = Readable<NavigationType>;

const navigationControllers: Record<NavigationType, Controller | undefined> = {
  'default': undefined,
  'dpad': dpadController,
};

export function initializeNavigation(device: DeviceType) {
  const ref = page.url.searchParams.get(PARAM_NAME);
  const hasDpadNavigation = device === 'tv' || ref === DPAD_REF;
  const navigationType = hasDpadNavigation ? 'dpad' : 'default';

  const navigation =
    getContext<NavigationContextData>(NAVIGATION_CONTEXT_KEY) ??
      setContext<NavigationContextData>(
        NAVIGATION_CONTEXT_KEY,
        readable(navigationType),
      );

  const redirect = () => {
    if (!page.url.searchParams.get(PARAM_NAME)) {
      return;
    }

    const url = new URL(page.url);
    url.searchParams.delete(PARAM_NAME);

    goto(url, {
      replaceState: true,
      keepFocus: true,
    });
  };

  return {
    controller: navigationControllers[get(navigation)],
    redirect,
  };
}

export function useNavigation() {
  return {
    navigation: assertDefined<Readable<NavigationType>>(
      getContext<NavigationContextData>(NAVIGATION_CONTEXT_KEY),
      'Navigation can only be used within the NavigationProvider context.',
    ),
  };
}
