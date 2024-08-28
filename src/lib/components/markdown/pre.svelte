<script>
  import { newToast } from '$lib/stores';
  import { scale } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { getIcon } from 'material-file-icons';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            in:scale={{ start: 0.5 }}
            ><path
              fill="currentColor"
              d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
            ></path>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            in:scale={{ start: 0.5 }}
            ><path
              fill="currentColor"
              d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6t.713.288T5 7v13h10q.425 0 .713.288T16 21t-.288.713T15 22zm4-6V4z"
            ></path></svg
          >
        {/if}
      </button>
    {/if}
  </div>
</div>

<style lang="postcss">
  :global(.codeContainer p + div .shiki) {
    @apply rounded-t-none;
  }
</style>
