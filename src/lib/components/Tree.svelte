<script>
  import { getIcon } from 'material-file-icons';
  import { Tree } from '$lib/components';
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';

  const { tree, root = true, open = true, class: className, ...restProps } = $props();

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
  class={cn('tree',
    root
      ? 'rounded bg-[var(--inline-code-bg)] p-4'
      : 'ml-1.5 border-l-2 border-neutral-700 pl-2.5',
    className
  )}
  {...restProps}
>
  {#each tree as element}
    {#if element?.children}
      <!-- Is a directory -->
      <li>
        <details open={element?.open ?? open}>
          <summary
            class={cn(
              'mt-1 flex w-fit cursor-pointer flex-row items-center gap-2 text-base font-bold text-neutral-100 transition-colors hover:text-neutral-400',
              !root && 'px-1',
              element?.highlighted && 'rounded bg-primary-700/50'
            )}
          >
            <Icon icon="material-symbols:folder" class="folder-close size-4" />
            <Icon icon="material-symbols:folder-open" class="folder-open size-4" />
            {element.name}
          </summary>
          <Tree tree={element.children} root={false} />
        </details>
      </li>
    {:else}
      <!-- Is a file -->
      <li
        class={cn(
          'm-0 mt-1 flex w-fit list-none flex-row items-center gap-2 px-1 text-base text-neutral-300 dark:text-neutral-300',
          element?.highlighted && 'rounded bg-primary-700/50'
        )}
      >
        <div class="size-5">
          {@html getIcon(element).svg}
        </div>
        {element?.name || element}
      </li>
    {/if}
  {/each}
</ul>

<style>
  :global(details > summary > .folder-close) {
    display: block;
  }
  :global(details > summary > .folder-open) {
    display: none;
  }
  :global(details[open] > summary > .folder-close) {
    display: none;
  }
  :global(details[open] > summary > .folder-open) {
    display: block;
  }
</style>
