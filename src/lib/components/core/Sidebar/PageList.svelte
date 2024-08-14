<script>
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import { developSidebar } from '$conf';
  import Sidebar from './';

  const { pages = [], root = false, style = 'details' } = $props();
  const pathname = $derived(decodeURIComponent($page.url.pathname));

  /**
   * Determines if a page is nested.
   *
   * @param {Object} page - The page object.
   * @returns {boolean} - True if the page is nested, false otherwise.
   */
  const isNested = (page) => page.children && Object.keys(page.children).length > 0;

  // USER CONFIG : Customize the sidebar colors
  const itemBaseClasses =
    'transition-all px-2.5 py-1.5 font-semibold text-inherit capitalize text-sm cursor-pointer border-2 whitespace-nowrap rounded-md';
  const itemColors =
    'border-transparent dark:border-transparent hover:bg-neutral-300/25 dark:hover:bg-neutral-700/25';
  const activeItemColors =
    'border-primary-600 bg-primary-400/50 dark:border-primary-400 dark:bg-primary-900/50 text-primary-950 dark:text-primary-50';
</script>

{#if style === 'details'}
  <div
    class={cn(
      'ml-1 flex flex-col gap-2 p-2 pl-1',
      !root && 'ml-4 border-l-2 border-neutral-300/50 dark:border-neutral-700/50'
    )}
  >
    {#each pages as page}
      {#if isNested(page)}
        <Sidebar.PageListCollapsible
          summary={page.name}
          classes={{ itemBaseClasses, itemColors }}
          open={developSidebar}
        >
          <Sidebar.PageList pages={page.children} />
        </Sidebar.PageListCollapsible>
      {:else}
        <a
          href={page.url}
          class={cn(
            itemBaseClasses,
            'block text-neutral-600 dark:text-neutral-400',
            pathname === page.url ? activeItemColors : itemColors
          )}
        >
          {page.name}
        </a>
      {/if}
    {/each}
  </div>
{:else}
  <div class="flex flex-col gap-2 p-1">
    {#each pages as page}
      {#if isNested(page)}
        <div class="flex flex-col gap-2">
          <span class={cn(itemBaseClasses, 'border-none text-base uppercase')}
            >{page.name}</span
          >
          <PageList pages={page.children} />
        </div>
      {:else}
        <a
          href={page.url}
          class={cn(
            itemBaseClasses,
            'block',
            pathname === page.url ? activeItemColors : itemColors
          )}
        >
          {page.name}
        </a>
      {/if}
    {/each}
  </div>
{/if}
