<script>
  import Icon from '@iconify/svelte';
  import { cn, accordion } from '$lib/utils';
  import Tree from './Tree.svelte';

  const { element, open = true, itemClasses } = $props();

  let isOpen = $state(element.open ?? open);
  let treeCollapsible = $state();

  $effect(() => {
    Array.from(treeCollapsible.querySelectorAll('.tree-collapsible button'))
      .slice(1)
      .forEach((button) => {
        button.setAttribute('tabIndex', isOpen ? '0' : '-1');
      });
  });
</script>

<div class="tree-collapsible" bind:this={treeCollapsible}>
  <button
    class={itemClasses}
    onclick={() => (isOpen = !isOpen)}
    aria-expanded={isOpen}
    expanded={isOpen}
    type="button"
  >
    {#if isOpen}
      <Icon icon="lucide:folder-open" class="folder-open size-4" />
    {:else}
      <Icon icon="lucide:folder" class="folder-close size-4" />
    {/if}
    <div
      class={cn(
        element?.highlighted && 'text-primary-500 dark:text-primary-600'
      )}
    >
      {element.name}
    </div>
  </button>

  <div use:accordion={isOpen}>
    <Tree tree={element.children} root={false} />
  </div>
</div>
