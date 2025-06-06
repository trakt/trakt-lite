<script lang="ts">
  import Link from "$lib/components/link/Link.svelte";
  import { useUser } from "$lib/features/auth/stores/useUser";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import YearToDateArrow from "../../../components/icons/YearToDateArrow.svelte";

  const { isVip, slug }: { isVip: boolean; slug: string } = $props();
  const { user } = useUser();

  const currentYear = new Date().getFullYear();

  const hasYearToDateLink = $derived(isVip || slug === "me");

  const ogHref = $derived(
    isVip
      ? UrlBuilder.og.yearToDate(slug, currentYear)
      : UrlBuilder.og.getVip(),
  );

  // FIXME: always use iframe route when the kinks are ironed out
  const target = $derived($user.isDirector ? "_self" : "_blank");
  const href = $derived(
    $user.isDirector ? UrlBuilder.users(slug).yearToDate(currentYear) : ogHref,
  );
</script>

{#if hasYearToDateLink}
  <trakt-year-to-date-link>
    <Link {href} {target}>
      <div class="ytd-link-content">
        <h2 class="ytd-year">{currentYear}</h2>
        <div class="ytd-link-details">
          <h5 class="ytd-label">Year to date</h5>
          <YearToDateArrow />
        </div>
      </div>
    </Link>
  </trakt-year-to-date-link>
{/if}

<style>
  trakt-year-to-date-link {
    :global(.trakt-link) {
      text-decoration: none;
    }
  }

  .ytd-link-details {
    display: flex;
    align-items: center;
    gap: var(--gap-m);
    text-transform: uppercase;

    .ytd-label {
      max-width: var(--ni-112);
    }
  }

  .ytd-link-content {
    @media (max-width: 768px) {
      display: flex;
      gap: var(--gap-m);
    }

    @media (max-width: 480px) {
      .ytd-link-details {
        gap: var(--gap-xs);
      }

      .ytd-year {
        font-size: var(--ni-48);
      }

      .ytd-label {
        font-size: var(--ni-18);
        max-width: var(--ni-96);
      }

      :global(svg) {
        width: var(--ni-32);
        height: var(--ni-32);
      }
    }
  }
</style>
