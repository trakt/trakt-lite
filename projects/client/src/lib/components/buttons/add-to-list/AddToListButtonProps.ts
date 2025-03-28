import type { Snippet } from 'svelte';

// TODO clean up props
export type AddToListButtonProps = {
  title: string;
  isListUpdating: boolean;
  isListed: boolean;
  onAdd: () => void;
  onRemove: () => void;
  items: Snippet;
} & Omit<ButtonProps, 'children' | 'onclick' | 'label'>;
