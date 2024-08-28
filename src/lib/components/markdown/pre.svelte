<script>
  import { newToast } from '$lib/stores';
  import { scale } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { getIcon } from 'material-file-icons';
  import Icon from '@iconify/svelte';

  const { children, class: className, name, icon, copyCode = true } = $props();
  let codeCopied = $state(false);
  let interval = $state();
  let codeContainer = $state();

  /**
   * Function to copy text.
   */
  function copyText() {
    // Change the button icon to a checkmark
    codeCopied = true;
    const textToCopy = codeContainer.querySelector('code').innerText;
    // Write the code to clipboard
    navigator.clipboard.writeText(textToCopy);
    // Show toast
    newToast({
      title: 'Copied to clipboard',
      message: 'The code has been copied to your clipboard',
      type: 'green'
    });
    if (interval) {
      clearTimeout(interval);
      interval = null;
    }
    interval = setTimeout(() => {
      // Reset the button icon back to default
      codeCopied = false;
    }, 2000);
  }
</script>

{#snippet copyCodeButton(absolute = true)}
  {#if copyCode !== 'false'}
    <button
      onclick={copyText}
      tabindex="0"
      class={cn(
        'flex aspect-square h-[2.5rem] items-center justify-center rounded-full p-1 text-neutral-600 transition active:scale-90 hocus:scale-105 dark:text-neutral-100',
        absolute && 'absolute bottom-1 right-4 top-4'
      )}
      name="Copy code"
      aria-label="Copy code"
    >
      {#if codeCopied}
        <div in:scale={{ start: 0.5 }}>
          <Icon icon="material-symbols:check-rounded" class="size-6" />
        </div>
      {:else}
        <div in:scale={{ start: 0.5 }}>
          <Icon
            icon="material-symbols:content-copy-outline-rounded"
            class="size-6"
          />
        </div>
      {/if}
    </button>
  {/if}
{/snippet}

<div class="codeContainer relative my-4" bind:this={codeContainer}>
  {#if name}
    <div
      class="codeBlockName relative flex w-full flex-row items-center rounded-t-md border border-b-0 border-main px-3 py-1.5 dark:border-main-dark"
    >
      <p
        class="m-0 flex flex-row items-center gap-2 text-base font-medium text-body-dark dark:text-body"
      >
        {#if icon == 'true'}
          <span class="size-5">
            {@html getIcon(name).svg}
          </span>
        {/if}
        {name}
      </p>
      <div class="ml-auto">
        {@render copyCodeButton(false)}
      </div>
    </div>
  {/if}
  <div class={className}>
    {@render children()}
    {#if !name}
      {@render copyCodeButton()}
    {/if}
  </div>
</div>

<style>
  :global(.codeBlockName + div .shiki) {
    @apply rounded-t-none;
  }
</style>
