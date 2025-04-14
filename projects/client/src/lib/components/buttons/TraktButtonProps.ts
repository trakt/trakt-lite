import type { DpadNavigationType } from '$lib/features/navigation/models/DpadNavigationType.ts';
import type { Snippet } from 'svelte';

export type TraktButtonProps = ButtonProps & {
  color?: 'purple' | 'red' | 'blue' | 'orange' | 'default' | 'custom';
  variant?: 'primary' | 'secondary';
  style?: 'textured' | 'flat' | 'ghost' | 'underlined';
  icon?: Snippet;
  subtitle?: Snippet;
  size?: 'normal' | 'small' | 'tag';
  text?: 'capitalize' | 'uppercase';
  navigationType?: DpadNavigationType;
};
