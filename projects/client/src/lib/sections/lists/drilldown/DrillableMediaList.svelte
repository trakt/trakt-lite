<script lang="ts" generics="T extends { id: unknown }, M">
  import SectionList from "$lib/components/lists/section-list/SectionList.svelte";
  import type { Snippet } from "svelte";
  import ViewAllButton from "../components/ViewAllButton.svelte";
  import { mediaListHeightResolver } from "../utils/mediaListHeightResolver";
  import type { DrillListProps } from "./DrillListProps";
  import type { MediaStore } from "./MediaStore";

  type DrillableList<T, M> = DrillListProps<T, M> & {
    drilldownLabel: string;
    useList: MediaStore<T, M>;
    emptyMessage?: string;
    badge?: Snippet;
  };

  const {
    id,
    title,
    drilldownLabel,
    emptyMessage,
    type,
    item,
    useList,
    urlBuilder,
    badge,
  }: DrillableList<T, M> = $props();

  const { list, isLoading } = $derived(useList({ type }));
  const isEmptyList = $derived(!$isLoading && $list.length === 0);
</script>

<SectionList
  {id}
  items={$list}
  {item}
  {title}
  {badge}
  --height-list={mediaListHeightResolver(type)}
>
  {#snippet actions()}
    <ViewAllButton
      href={urlBuilder({ type })}
      label={drilldownLabel}
      isDisabled={isEmptyList}
    />
  {/snippet}

  {#snippet empty()}
    {#if !$isLoading && emptyMessage}
      <p class="small secondary">
        {emptyMessage}
      </p>
    {/if}
  {/snippet}
</SectionList>
