<script lang="ts">
  import type { DeviceProps } from "./_internal/DeviceProps";
  import type { InputProps } from "./_internal/InputProps";
  import type { NavigationProps } from "./_internal/NavigationProps";
  import RenderForAudience from "./_internal/RenderForAudience.svelte";
  import RenderForDevice from "./_internal/RenderForDevice.svelte";
  import RenderForInput from "./_internal/RenderForInput.svelte";
  import RenderForNavigation from "./_internal/RenderForNavigation.svelte";

  type RenderForProps =
    | (ChildrenProps &
        AudienceProps &
        DeviceProps &
        InputProps &
        NavigationProps)
    | (ChildrenProps &
        Partial<DeviceProps> &
        Partial<InputProps> &
        Partial<NavigationProps> &
        AudienceProps);

  const { children, audience, device, input, navigation }: RenderForProps =
    $props();
</script>

{#snippet guardedContent()}
  {#if device && input}
    <RenderForDevice {device}>
      <RenderForInput {input}>
        {@render children()}
      </RenderForInput>
    </RenderForDevice>
  {/if}

  {#if device && !input}
    <RenderForDevice {device}>
      {@render children()}
    </RenderForDevice>
  {/if}

  {#if input && !device}
    <RenderForInput {input}>
      {@render children()}
    </RenderForInput>
  {/if}

  {#if !device && !input}
    {@render children()}
  {/if}
{/snippet}

<RenderForAudience {audience}>
  {#if navigation}
    <RenderForNavigation {navigation}>
      {@render guardedContent()}
    </RenderForNavigation>
  {:else}
    {@render guardedContent()}
  {/if}
</RenderForAudience>
