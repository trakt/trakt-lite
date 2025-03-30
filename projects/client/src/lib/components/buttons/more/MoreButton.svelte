<script lang="ts">
  import { KbNavigationType } from "$lib/features/kb-navigation/models/KbNavigationType";
  import { writable } from "svelte/store";
  import Button from "../Button.svelte";
  import type { MoreButtonIntl } from "./MoreButtonIntl";

  type MediaCollapsableValuesProps = {
    i18n: MoreButtonIntl;
    count: number | Nil;
    label: string;
    onExpand: () => void;
    onCollapse: () => void;
  };

  const {
    i18n,
    count,
    label,
    onCollapse,
    onExpand,
  }: MediaCollapsableValuesProps = $props();
  const expanded = writable(false);
</script>

<Button
  onclick={() =>
    expanded.update((state) => {
      if (state) {
        onCollapse();
      } else {
        onExpand();
      }

      return !state;
    })}
  {label}
  style="ghost"
  size="tag"
  color="purple"
  navigationType={KbNavigationType.Item}
>
  {$expanded ? "-" : "+"}
  {i18n.more(count)}
</Button>
