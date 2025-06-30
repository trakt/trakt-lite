<script lang="ts">
  import { page } from "$app/state";
  import type { MediaType } from "$lib/requests/models/MediaType";
  import {} from "svelte";
  import { createSearchContext } from "./_internal/createSearchContext";

  const { children, type }: ChildrenProps & { type: MediaType } = $props();

  const { pathName, exitPathName, query } = createSearchContext(type);

  $effect(() => {
    if (!page.url.pathname.startsWith(pathName)) {
      //TODO better
      const newPath = page.url.pathname === "/" ? "/search" : page.url.pathname;
      exitPathName.set(newPath);
    }
  });

  $effect(() => {
    if (!page.url.searchParams.has("q")) {
      return;
    }

    const q = page.url.searchParams.get("q");
    if (!q?.trim()) {
      return;
    }

    query.set(q);
  });
</script>

{@render children()}
