<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { scale } from 'svelte/transition';
  import { socials } from '$conf';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';

  let { title } = $props();
</script>

<nav
  class="w-full px-4 sticky top-0 z-40 max-md:h-16 md:p-4 bg-white dark:bg-neutral-900 flex flex-row justify-between items-center border-b border-neutral-300 dark:border-neutral-800"
>
  <div class="flex flex-row gap-2 max-md:pl-12">
    <h1 class="m-0">{title}</h1>
  </div>

  <div class="flex flex-row gap-2 items-center max-md:hidden">
    {#each Object.entries(socials) as [name, url]}
      <a href={url} class="h-fit p-1">
        <Icon icon="ri:{name.toLocaleLowerCase()}-line" class="size-6" />
      </a>
    {/each}
    <span class="w-px h-10 bg-neutral-300 dark:bg-neutral-800"></span>
    <button
      onclick={toggleMode}
      class="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
    >
      {#if $mode === 'dark'}
        <div in:scale>
          <Icon icon="material-symbols:light-mode-outline" class="size-6" />
        </div>
      {:else}
        <div in:scale>
          <Icon icon="material-symbols:dark-mode-outline" class="size-6" />
        </div>
      {/if}
    </button>

    <button
      onclick={() => ($searchModalShown = true)}
      class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <Icon icon="material-symbols:search-rounded" class="size-6" />
    </button>
  </div>
</nav>
