<script lang="ts">
  const { variant }: { variant: "flat" | "gradient" } = $props();
</script>

<svg
  width="32"
  height="33"
  viewBox="0 0 32 33"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_7713_149366)">
    <mask
      id="mask0_7713_149366"
      style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="32"
      height="33"
    >
      <path
        d="M32 16.6895C32 7.8529 24.8366 0.689453 16 0.689453C7.16344 0.689453 0 7.8529 0 16.6895C0 25.526 7.16344 32.6895 16 32.6895C24.8366 32.6895 32 25.526 32 16.6895Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_7713_149366)">
      <path
        d="M32 16.6895C32 7.8529 24.8366 0.689453 16 0.689453C7.16344 0.689453 0 7.8529 0 16.6895C0 25.526 7.16344 32.6895 16 32.6895C24.8366 32.6895 32 25.526 32 16.6895Z"
        fill={variant === "gradient"
          ? "url(#circular-logo-gradient)"
          : "#9f42c6"}
      />
      <path
        d="M11.4966 10.2592L10.5176 11.2383L15.8008 16.5215L16.7798 15.5424L11.4966 10.2592Z"
        fill="#FEFEFE"
      />
      <path
        d="M10.0631 11.7006L9.08398 12.6797L14.3672 17.9629L15.3463 16.9838L10.0631 11.7006Z"
        fill="#FEFEFE"
      />
      <path
        d="M8.62165 13.1323L7.64258 14.1113L17.2394 23.7081L18.2184 22.729L8.62165 13.1323Z"
        fill="#FEFEFE"
      />
      <path
        d="M32.3382 0.903955L13.873 19.3691L14.8521 20.3482L33.3173 1.88303L32.3382 0.903955Z"
        fill="#FEFEFE"
      />
      <path
        d="M18.6812 22.2743L16.2598 19.8596L32.34 3.7793L33.3166 4.75589L18.2196 19.8596L19.6578 21.2977L18.6812 22.2743Z"
        fill="#FEFEFE"
      />
      <path
        d="M32.3435 6.66042L19.1426 19.8613L20.1216 20.8404L33.3226 7.6395L32.3435 6.66042Z"
        fill="#FEFEFE"
      />
      <path
        d="M16.0001 29.6252C8.86964 29.6252 3.07031 23.8258 3.07031 16.6954C3.07031 9.56495 8.86964 3.76562 16.0001 3.76562C17.9466 3.76562 19.8128 4.18703 21.5586 5.01646L20.9633 6.2673C19.4048 5.52482 17.7392 5.15024 16.0001 5.15024C9.63219 5.15024 4.44824 10.3342 4.44824 16.7021C4.44824 23.07 9.63219 28.2539 16.0001 28.2539C20.5486 28.2539 24.689 25.5716 26.5486 21.4178L27.8128 21.9797C25.7325 26.6285 21.0971 29.6318 16.0068 29.6318L16.0001 29.6252Z"
        fill="#FEFEFE"
      />
    </g>
  </g>
  <defs>
    <radialGradient
      id="circular-logo-gradient"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(31.9171 0.603832) scale(38.6462)"
    >
      <stop stop-color="#9F42C6" />
      <stop offset="0.27" stop-color="#A041C3" />
      <stop offset="0.42" stop-color="#A43EBB" />
      <stop offset="0.53" stop-color="#AA39AD" />
      <stop offset="0.64" stop-color="#B4339A" />
      <stop offset="0.73" stop-color="#C02B81" />
      <stop offset="0.82" stop-color="#CF2061" />
      <stop offset="0.9" stop-color="#E1143C" />
      <stop offset="0.97" stop-color="#F50613" />
      <stop offset="1" stop-color="#FF0000" />
    </radialGradient>
    <clipPath id="clip0_7713_149366">
      <rect
        width="32"
        height="32"
        fill="white"
        transform="translate(0 0.689453)"
      />
    </clipPath>
  </defs>
</svg>
