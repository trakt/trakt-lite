import { onMount } from 'svelte';

export function scrollIntoView(node: HTMLElement, isSourceComment: boolean) {
  const update = (isSourceComment: boolean) => {
    isSourceComment &&
      node.scrollIntoView({ behavior: 'instant', inline: 'center' });
  };

  onMount(() => update(isSourceComment));
  return { update };
}
