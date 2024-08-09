<script>
  import PageList from './PageList.svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  const { pages = [], root = false } = $props();
  const isNested = (page) => page.children && Object.keys(page.children).length > 0;
  const pathname = $derived(decodeURIComponent($page.url.pathname));

  // USER CONFIG : Customize the sidebar colors
  const itemColors =
    'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100';
  const activeItemColors =
    'text-neutral-100 dark:text-neutral-100 dark:bg-primary-700/50 bg-primary-700/50';
</script>

<div
  class="pl-1 ml-2 {!root &&
    'border-l-2 border-neutral-300 dark:border-neutral-800'} flex flex-col gap-2"
>
  {#each pages as page}
    {#if isNested(page)}
      <details>
        <summary
          class="p-2 transition-all flex flex-row justify-between items-center {itemColors} rounded cursor-pointer font-semibold"
        >
          {page.name}
          <Icon icon="ri:arrow-down-s-line" class="size-6 transition-transform arrow" />
        </summary>
        <PageList pages={page.children} />
      </details>
    {:else}
      <a
        href={page.url}
        class="block p-2 transition-all rounded cursor-pointer font-semibold {pathname === page.url
          ? activeItemColors
          : itemColors}"
      >
        {page.name}
      </a>
    {/if}
  {/each}
</div>

<style>
  /* Dropdown arrow */
  details[open] .arrow {
    transform: rotate(180deg);
  }
</style>
