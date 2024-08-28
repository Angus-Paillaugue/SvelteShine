<script>
  import { newToast } from '$lib/stores';
  import { scale } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { getIcon } from 'material-file-icons';
  import Icon from '@iconify/svelte';

  const { children, class: className, name, icon, copyCode = true } = $props();
  let codeCopied = $state(false);
  let interval = $state();

  /**
   * Function to copy text.
   *
   * @param {Event} e - The event object.
   */
  function copyText(e) {
    // Change the button icon to a checkmark
    codeCopied = true;
    const textToCopy = e.target
      .closest('button')
      .parentElement.querySelector('code').innerText;
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

<div class="codeContainer my-4">
  {#if name}
    <p
      class="m-0 flex flex-row items-center gap-2 rounded-t-md border border-b-0 border-main px-3 py-1 text-base font-medium text-body-dark dark:border-main-dark dark:text-body"
    >
      {#if icon == 'true'}
        <span class="size-5">
          {@html getIcon(name).svg}
        </span>
      {/if}
      {name}
    </p>
  {/if}
  <div class={cn('relative', className)}>
    {@render children()}
    {#if copyCode !== 'false'}
      <button
        onclick={copyText}
        tabindex="0"
        class="absolute bottom-1 right-1.5 top-1.5 flex aspect-square h-[2.5rem] items-center justify-center rounded-full bg-neutral-950 p-1 text-neutral-100 transition active:scale-90 hocus:scale-105"
        name="Copy code"
        aria-label="Copy code"
      >
        {#if codeCopied}
          <div in:scale={{ start: 0.5 }}>
            <Icon icon="material-symbols:check-rounded" class="size-6" />
          </div>
        {:else}
          <div in:scale={{ start: 0.5 }}>
            <Icon icon="material-symbols:content-copy-outline-rounded" class="size-6" />
          </div>
        {/if}
      </button>
    {/if}
  </div>
</div>

<style>
  :global(.codeContainer p + div .shiki) {
    @apply rounded-t-none;
  }
</style>
