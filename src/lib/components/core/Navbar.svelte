<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { scale } from 'svelte/transition';
  import { socials } from '$conf';
  import Icon from '@iconify/svelte';

  let { title } = $props();
</script>

<nav
  class="w-full px-4 sticky top-0 z-40 max-md:h-16 md:p-4 bg-white dark:bg-neutral-900 flex flex-row justify-between items-center border-b border-neutral-300 dark:border-neutral-800"
>
  <div class="flex flex-row gap-2 max-md:pl-12">
    <h1 class="mb-0">{title}</h1>
  </div>

  <div class="flex flex-row gap-2 items-center">
    {#each Object.entries(socials) as [name, url]}
      <a href={url} class="h-fit p-1">
        <Icon icon="ri:{name.toLocaleLowerCase()}-line" class="size-6" />
      </a>
    {/each}
    <span class="w-px h-10 bg-neutral-300 dark:bg-neutral-700"></span>
    <button
      onclick={toggleMode}
      class="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
    >
      {#if $mode === 'dark'}
        <div class="" in:scale>
          <Icon icon="ri:sun-line" class="size-6" />
        </div>
      {:else}
        <div class="" in:scale>
          <Icon icon="ri:moon-line" class="size-6" />
        </div>
      {/if}
    </button>
  </div>
</nav>
