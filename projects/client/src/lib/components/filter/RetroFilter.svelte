<div class="retro-filter-overlay"></div>

<style>
  :global(:root) {
    --retro-filter-z-index: 1337;
    --retro-filter-opacity: 0.9;
    --retro-filter-animation-duration: var(--transition-increment);
  }

  .retro-filter-overlay {
    position: fixed;
    z-index: var(--retro-filter-z-index);
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200vh;
    scale: 1.35;
    backdrop-filter: sepia(0.35) contrast(1.05);
    pointer-events: none;
    background: transparent url("$lib/components/filter/noise.png") repeat 0 0;
    background-repeat: repeat;
    animation: noise-image-animation var(--retro-filter-animation-duration)
      infinite;
    opacity: var(--retro-filter-opacity);
    visibility: visible;
  }

  @keyframes noise-image-animation {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-5%, -5%);
    }
    20% {
      transform: translate(-10%, 5%);
    }
    30% {
      transform: translate(5%, -10%);
    }
    40% {
      transform: translate(-5%, 15%);
    }
    50% {
      transform: translate(-10%, 5%);
    }
    60% {
      transform: translate(15%, 0);
    }
    70% {
      transform: translate(0, 10%);
    }
    80% {
      transform: translate(-15%, 0);
    }
    90% {
      transform: translate(10%, 5%);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>
