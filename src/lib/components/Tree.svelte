<script>
  import { getIcon } from 'material-file-icons';
  import { Tree } from '$lib/components';
  import Icon from '@iconify/svelte';

  const { tree, root = true, open = true } = $props();

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
  //   highted: boolean, // Optional
  // }
</script>

<ul
  class={root ? 'bg-[var(--inline-code-bg)] p-4 rounded-md' : 'border-l-2 border-neutral-700 pl-4'}
>
  {#each tree as element}
    {#if element?.children}
      <!-- Is a directory -->
      <details open={element?.open ?? open}>
        <summary
          class="flex flex-row gap-2 items-center cursor-pointer text-base font-bold text-neutral-100 hover:text-neutral-400 transition-colors mt-1 w-fit {!root &&
            'px-1'} {element?.highted && 'bg-primary-700/50 rounded'}"
        >
          <Icon icon="material-symbols:folder" class="size-4 folder-close" />
          <Icon icon="material-symbols:folder-open" class="size-4 folder-open" />
          {element.name}
        </summary>
        <Tree tree={element.children} root={false} />
      </details>
    {:else}
      <!-- Is a file -->
      <li
        class="list-none px-1 w-fit m-0 mt-1 flex flex-row gap-2 items-center text-neutral-100 {element?.highted &&
          'bg-primary-700/50 rounded'}"
      >
        <div class="size-5">
          {@html getIcon(element).svg}
        </div>
        <span class="text-base">
          {element?.name || element}
        </span>
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
