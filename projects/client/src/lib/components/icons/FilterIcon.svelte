<script lang="ts">
  // TODO better prop name
  const { isActive = false }: { isActive?: boolean } = $props();
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d={isActive ? "M3 5H21" : "M3 7H21"}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
  <path
    d="M7 12H17"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
  <path
    d={isActive ? "M10 19H14" : "M10 17H14"}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
</svg>

<style>
  svg path {
    transition: d var(--transition-increment) ease-in-out;
  }
</style>
