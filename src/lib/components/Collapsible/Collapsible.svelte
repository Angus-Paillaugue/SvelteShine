<script>
  import { cn } from '$lib/utils';
  import Icon from '@iconify/svelte';
  import { accordion } from '$lib/utils';

  let {
    class: className,
    summary,
    children,
    icon,
    open = $bindable(false),
    ...restProps
  } = $props();
  let collapsible = $state();

  /**
   * Sets the tab index for the collapsible component children.
   */
  function setTabIndex() {
    const details = collapsible.querySelector('.collapsible-details');
    const detailsElements = details.querySelectorAll('a, button, input, select, textarea, pre.shiki');

    detailsElements.forEach((el) => {
      if (open) {
        el.setAttribute('tabindex', el.getAttribute('data-tabindex') ?? 0);
      } else {
        el.setAttribute('data-tabindex', el.getAttribute('tabindex') ?? 0);
        el.setAttribute('tabindex', -1);
      }
    });
  }

  $effect(setTabIndex);
</script>

<div
  class={cn(
    'collapsible mb-6 w-full overflow-hidden rounded-md border border-main bg-body transition-colors dark:border-main-dark dark:bg-neutral-950',
    className
  )}
  {...restProps}
  bind:this={collapsible}
>
  <button
    onclick={() => (open = !open)}
    aria-expanded={open}
    aria-controls={summary}
    class="items-between flex w-full cursor-pointer flex-row items-center px-4 py-2 text-base font-semibold -outline-offset-2 transition-colors hover:bg-neutral-200/50 dark:bg-inherit"
  >
    <span class="arrow transition-all">
      <Icon
        icon="material-symbols:arrow-right-rounded"
        class={cn('size-7 transition-transform', open && 'rotate-90')}
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
