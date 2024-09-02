<script>
  import { cn } from '$lib/utils';
  import List from './List.svelte';
  import Icon from '@iconify/svelte';

  let { tree, root = true, class: className, ...restProps } = $props();

  const itemClasses =
    'm-0 flex list-none flex-row items-center gap-2 px-2 py-1 text-base rounded transition-colors duration-100 hocus:bg-neutral-100 hocus:dark:bg-neutral-800 w-full text-neutral-700 dark:text-neutral-300';

  // A tree is an array of objects with the following structure:
  // [
  //   {
  //     name: string,
  //     children: array,
  //     open: boolean, // Optional, default is true
  //   },
  // ]

  // A child is a string representing it's name or it can be an object with the following structure:
  // {
  //   name: string,
  //   highlighted: boolean, // Optional
  // }
</script>

<ul
  class={cn(
    'tree h-fit',
    root
      ? 'rounded border border-main bg-body p-4 dark:border-main-dark dark:bg-neutral-900'
      : 'ml-4 border-l border-neutral-300/70 pl-1 dark:border-neutral-700/70',
    className
  )}
  {...restProps}
>
  {#each tree as element}
    <li class="m-0">
      {#if element?.children}
        <!-- Is a directory -->
        <List {element} open{open} {itemClasses} />
      {:else}
        <!-- Is a file -->
        <div class={itemClasses}>
          <Icon icon="lucide:file" class="size-4" />
          <div
            class={cn(
              element?.highlighted && 'text-primary-500 dark:text-primary-600'
            )}
          >
            {element?.name || element}
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
