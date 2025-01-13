<script lang="ts">
  import CardCover from "$lib/components/card/CardCover.svelte";
  import PersonCard from "$lib/components/people/card/PersonCard.svelte";
  import SectionList from "$lib/components/section-list/SectionList.svelte";
  import type { CastMember } from "$lib/models/CastMember";
  import { mediaListHeightResolver } from "./utils/mediaListHeightResolver";

  type CastListProps = {
    title: string;
    cast: CastMember[];
  };

  const { title, cast }: CastListProps = $props();
</script>

<!-- TODO gap -->
<SectionList
  id={`cast-list`}
  items={cast}
  {title}
  --height-list={mediaListHeightResolver("person")}
>
  {#snippet item(castMember)}
    <!-- TODO: extract -->
    <div class="trakt-person-card">
      <PersonCard>
        <CardCover
          src={castMember.headShotUrl}
          alt={`${castMember.name} poster`}
          hasBottomGradient={false}
        ></CardCover>
      </PersonCard>
      <div class="trakt-person-card-footer">
        <p class="secondary ellipsis actor-name">{castMember.name}</p>
        <p class="small secondary ellipsis">{castMember.characterName}</p>
      </div>
    </div>
  {/snippet}
</SectionList>

<style>
  .trakt-person-card {
    width: var(--width-person-card);
  }

  .trakt-person-card-footer {
    overflow: hidden;

    .actor-name {
      font-weight: 600;
    }
  }
</style>
