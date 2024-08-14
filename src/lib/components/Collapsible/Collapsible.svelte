<script>
  import { cn } from '$lib/utils';
  import Icon from '@iconify/svelte';
  import { accordion } from '$lib/utils';

  let {
    class: classlist,
    summary,
    children,
    icon,
    open = $bindable(false),
    ...restProps
  } = $props();
</script>

<div
  class={cn(
    'collapsible mb-6 w-full rounded-md border border-neutral-300/50 bg-white overflow-hidden transition-colors dark:border-neutral-700/50 dark:bg-neutral-950',
    classlist
  )}
  {...restProps}
>
  <button
    onclick={() => (open = !open)}
    aria-expanded={open}
    aria-controls={summary}
    class="items-between flex w-full cursor-pointer flex-row items-center px-4 py-2 text-base font-semibold transition-colors hover:bg-neutral-200/50 dark:bg-inherit"
  >
    <span class="arrow transition-all">
      <Icon
        icon="material-symbols:arrow-right-rounded"
        class="size-7 transition-transform {open && 'rotate-90'}"
      />
    </span>
    {#if icon}
      <Icon {icon} class="mr-2 size-6" />
    {/if}
    {@html summary}
  </button>
  <div use:accordion={open}>
    <div class="collapsible-details p-4">
      {@render children()}
    </div>
  </div>
</div>

<style>
  /* Removes the margin bottom to the last element of the details of the collapsible to have just a nice padding all around */
  :global(.collapsible-details *:last-child) {
    margin-bottom: 0;
  }
</style>
