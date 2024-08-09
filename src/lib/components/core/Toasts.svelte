<script>
  import { removeToast } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { toasts } from '$lib/stores';
  import Icon from '@iconify/svelte';

  const baseToastClasses =
    'rounded-xl border bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 p-4 relative text-neutral-600 dark:text-neutral-300';

  // USER CONFIG : Customize the toast svg colors
  const svgColors = {
    red: 'text-red-600',
    green: 'text-green-600',
    gray: 'text-neutral-600'
  };
</script>

<div
  class="fixed bottom-0 z-[51] right-0 p-2 lg:p-4 flex flex-col gap-2 max-h-[100vh-5rem] max-w-[500px] w-full"
>
  {#each $toasts.slice(0, 4) as toast (toast.id)}
    <div
      role="alert"
      class={baseToastClasses}
      animate:flip={{ duration: 500 }}
      transition:fly={{ duration: 250, x: '100%' }}
    >
      <div class="flex items-center gap-2">
        {#if toast.type === 'red'}
          <Icon icon="ri:alert-line" class="h-5 w-5 {svgColors[toast.type]}" />
        {:else if toast.type === 'green'}
          <Icon icon="ri:check-line" class="h-5 w-5 {svgColors[toast.type]}" />
        {:else}
          <Icon icon="ri:information-line" class="h-5 w-5 {svgColors[toast.type]}" />
        {/if}

        <strong class="block font-medium">{toast.title}</strong>
      </div>

      <p class="mt-2 mb-0 text-sm">
        {@html toast.message}
      </p>
      <button class="absolute top-2 right-2" on:click={() => removeToast(toast.id)}>
        <Icon icon="ri:close-line" class="size-5" />
      </button>
    </div>
  {/each}
</div>
