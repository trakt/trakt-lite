import type { TraktButtonProps } from '$lib/components/buttons/TraktButtonProps.ts';
import type { Snippet } from 'svelte';

export type TraktDropdownListProps = {
  items: Snippet;
  preferNative?: boolean;
  style?: Exclude<TraktButtonProps['style'], 'ghost' | 'underlined'>;
} & Omit<TraktButtonProps, 'style'>;
