<script lang="ts">
  import Switch from "$lib/components/toggles/Switch.svelte";
  import { writable } from "svelte/store";

  const props = [
    { color: "purple" as const, isChecked: writable(true), innerText: "Lite" },
    { color: "red" as const, isChecked: writable(false) },
    { color: "blue" as const, isChecked: writable(true) },
    { color: "orange" as const, isChecked: writable(false) },
  ];
</script>

<main>
  <h1>Toggles</h1>

  <div class="toggle-display">
    <section>
      <h2 class="capitalize">Switches</h2>
      {#each props as { color, isChecked, innerText }}
        <Switch
          {isChecked}
          label={`This is the ${color} switch`}
          {color}
          {innerText}
        />
      {/each}
      <Switch
        isChecked={writable(true)}
        label={`This is the disabled switch`}
        disabled
      />
      <Switch
        isChecked={writable(false)}
        label={`This is the disabled switch`}
        disabled
      />
    </section>
  </div>
</main>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  main {
    display: flex;
    flex-direction: column;
    gap: var(--gap-xl);
    padding-top: var(--ni-32);
    align-items: center;

    @include for-tablet-sm-and-below {
      .toggle-display {
        flex-direction: column;
        align-items: center;
        gap: var(--gap-xl);
      }
    }

    section {
      display: flex;
      flex-direction: column;
      gap: var(--gap-m);
      align-items: start;
    }
  }

  .toggle-display {
    display: flex;
    justify-content: space-between;

    width: 75%;
  }
</style>
