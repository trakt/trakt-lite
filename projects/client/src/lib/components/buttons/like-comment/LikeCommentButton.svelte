<script lang="ts">
  import ActionButton from "$lib/components/buttons/ActionButton.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import DropdownItem from "$lib/components/dropdown/DropdownItem.svelte";
  import LikeIcon from "$lib/components/icons/LikeIcon.svelte";
  import { useMedia, WellKnownMediaQuery } from "$lib/stores/css/useMedia";
  import { usePermissions } from "$lib/stores/usePermissions";
  import { LikeCommentButtonIntlProvider } from "./LikeCommentButtonIntlProvider";
  import type { LikeCommentButtonProps } from "./LikeCommentButtonProps";

  const {
    style,
    size,
    onLike,
    onUnlike,
    isLiked,
    isLiking,
    likeCount,
    i18n = LikeCommentButtonIntlProvider,
  }: LikeCommentButtonProps = $props();

  const { isPermitted } = usePermissions("like");

  const handler = $derived(isLiked ? onUnlike : onLike);
  const iconStyle = $derived(isLiked ? "filled" : "open");
  const isMobile = useMedia(WellKnownMediaQuery.mobile);

  const commonProps: Omit<ButtonProps, "children"> = $derived({
    label: i18n.label({ likeCount, isLiked, isMobile: $isMobile }),
    color: "purple",
    variant: "primary",
    style: "ghost",
    size,
    onclick: handler,
    disabled: isLiking || !$isPermitted,
  });
</script>

{#if style === "normal"}
  <Button {...commonProps}>
    {#snippet icon()}
      <LikeIcon style={iconStyle} />
    {/snippet}

    {i18n.text({ likeCount, isLiked, isMobile: $isMobile })}
  </Button>
{/if}

{#if style === "action"}
  <ActionButton {...commonProps}>
    <LikeIcon style={iconStyle} />
  </ActionButton>
{/if}

{#if style === "dropdown-item"}
  <DropdownItem {...commonProps}>
    {i18n.label({ likeCount, isLiked, isMobile: $isMobile })}
    {#snippet icon()}
      <LikeIcon style={iconStyle} />
    {/snippet}
  </DropdownItem>
{/if}
