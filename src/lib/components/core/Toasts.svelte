<script>
  import { removeToast } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { toasts } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';

  const baseToastClasses =
    'rounded-xl border bg-neutral-50 dark:bg-neutral-950 border-main dark:border-main-dark p-4 relative';

  // USER CONFIG : Customize the toast svg colors
  const svgColors = {
    red: 'text-red-600',
    green: 'text-green-600',
    gray: 'text-neutral-600'
  };
</script>

<div
  class="fixed bottom-0 right-0 z-[51] flex max-h-[100vh-5rem] w-full max-w-[500px] flex-col-reverse gap-2 p-2 lg:p-4"
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
          <Icon
            icon="material-symbols:dangerous-outline-rounded"
            class={cn('h-5 w-5', svgColors[toast.type])}
          />
        {:else if toast.type === 'green'}
          <Icon
            icon="material-symbols:check-rounded"
            class={cn('h-5 w-5', svgColors[toast.type])}
          />
        {:else}
          <Icon
            icon="material-symbols:info-outline-rounded"
            class="h-5 w-5 {svgColors[toast.type]}"
          />
        {/if}

        <strong class="block font-medium">{toast.title}</strong>
      </div>

      <p class="mb-0 mt-2 text-sm">
        {@html toast.message}
      </p>
      <button class="absolute right-2 top-2" name="Remove toast" aria-label="Remove toast" on:click={() => removeToast(toast.id)}>
        <Icon icon="material-symbols:close-rounded" class="size-5" />
      </button>
    </div>
  {/each}
</div>
