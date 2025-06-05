<script lang="ts">
  import SectionList from "$lib/components/lists/section-list/SectionList.svelte";
  import type { UserProfile } from "$lib/requests/models/UserProfile";
  import ProfileCard from "./ProfileCard.svelte";

  const { profiles, title }: { profiles: UserProfile[]; title: string } =
    $props();
  const sluggedProfiles = $derived(
    profiles.map((profile) => ({
      ...profile,
      id: profile.slug,
    })),
  );
</script>

<SectionList
  id="TODO"
  items={sluggedProfiles}
  {title}
  --height-list="var(--height-landscape-list)"
>
  {#snippet empty()}
    Not following any profiles (yet).
  {/snippet}

  {#snippet item(profile)}
    <ProfileCard {profile} />
  {/snippet}
</SectionList>
