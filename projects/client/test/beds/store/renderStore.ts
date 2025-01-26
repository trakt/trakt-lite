import { isAuthorized } from '$test/beds/_internal/isAuthorized.ts';
import { render } from '@testing-library/svelte';
import StoreTestBed from './StoreTestBed.svelte';

export function setAuthorization(state: boolean) {
  isAuthorized.set(state);
}

export function renderStore<T>(factory: () => T): Promise<T> {
  return new Promise((resolve) =>
    render(StoreTestBed, {
      props: { factory, output: (value) => resolve(value as T) },
    })
  );
}
