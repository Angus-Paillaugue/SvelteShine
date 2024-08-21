<script>
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import { sideBar } from '$conf';
  import Sidebar from './';
  import Icon from '@iconify/svelte';

  const { pages = [], root = false, style = 'details', class: className, ...restProps } = $props();
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
    'transition-all px-2.5 py-1.5 font-semibold text-inherit capitalize text-sm cursor-pointer border-2 whitespace-nowrap rounded-md flex flex-row gap-2 items-center';
  const itemColors =
    'border-transparent dark:border-transparent hocus:bg-neutral-300/25 dark:hocus:bg-neutral-700/25';
  const activeItemColors =
    'border-primary-600 bg-primary-400/50 dark:border-primary-400 dark:bg-primary-900/50 text-primary-950 dark:text-primary-50';
</script>

{#if style === 'details'}
  <div
    class={cn(
      'ml-1 flex flex-col gap-2 p-2 pl-1',
      !root && 'ml-4 border-l-2 border-main dark:border-main-dark',
      className
    )}
    {...restProps}
  >
    {#each pages as page}
      {#if isNested(page)}
        <Sidebar.PageListCollapsible
          summary={page.name}
          classes={{ itemBaseClasses, itemColors }}
          open={sideBar.develop}
        >
          <Sidebar.PageList pages={page.children} />
        </Sidebar.PageListCollapsible>
      {:else}
        <a
          href={page.url}
          class={cn(
            itemBaseClasses,
            'text-text-body dark:text-text-body-dark',
            pathname === page.url ? activeItemColors : itemColors
          )}
        >
          {#if page.icon}
            <Icon
              icon={typeof page.icon === 'string' ? page.icon : page.icon.name}
              class={cn('size-5', typeof page.icon === 'object' && page.icon.class)}
            />
          {/if}
          {page.name}
        </a>
      {/if}
    {/each}
  </div>
{:else}
  <div class={cn('flex flex-col gap-2 p-1', className)} {...restProps}>
    {#each pages as page}
      {#if isNested(page)}
        <div class="flex flex-col gap-2">
          <span class={cn(itemBaseClasses, 'border-none text-base uppercase')}>{page.name}</span>
          <Sidebar.PageList pages={page.children} />
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
          {#if page.icon}
            <Icon
              icon={typeof page.icon === 'string' ? page.icon : page.icon.name}
              class={cn('size-5', typeof page.icon === 'object' && page.icon.class)}
            />
          {/if}
          {page.name}
        </a>
      {/if}
    {/each}
  </div>
{/if}
