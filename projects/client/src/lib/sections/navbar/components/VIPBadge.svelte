<script lang="ts">
  import VipTempIcon from "./VipTempIcon.svelte";
</script>

<div class="vip-badge">
  <VipTempIcon />
</div>

<style>
  .vip-badge {
    width: var(--ni-24);
    height: var(--ni-24);

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: var(--color-red-red-500, rgba(255, 0, 0, 1));

    box-shadow:
      0px 2px 8px 0px rgba(0, 0, 0, 0.16),
      1px -2px 4px 0px rgba(0, 0, 0, 0.25) inset,
      0px 1px 2px 0px rgba(255, 255, 255, 0.44) inset;
  }
</style>
