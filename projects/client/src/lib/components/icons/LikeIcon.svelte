<script lang="ts">
  const { style = "open" }: { style?: "filled" | "open" } = $props();
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4 9.34324V16.5385C4 17.8979 5.10207 19 6.46154 19H14.2444C15.5266 19 16.717 18.3348 17.389 17.2428L18.4677 15.49C19.4521 13.8904 19.7899 11.9758 19.4125 10.1359L18.971 7.98345C18.8535 7.41097 18.3497 7 17.7653 7H12.6154L13.3223 5.39173C13.9716 3.91455 13.4107 2.18525 12.0179 1.37047C11.6369 1.14761 11.1577 1.18435 10.8152 1.46266L5.81862 5.52237C4.66805 6.45721 4 7.86076 4 9.34324Z"
    stroke="currentColor"
    stroke-width="2"
    fill={style === "filled" ? "currentColor" : "none"}
  />
</svg>
