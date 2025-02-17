import { Writable } from 'svelte/store';

export type TraktSwitchProps = Omit<ButtonProps, 'children'> & {
  isChecked: Writable<boolean>;
  innerText?: string;
  color?: 'purple' | 'red' | 'blue' | 'orange' | 'default' | 'custom';
};
