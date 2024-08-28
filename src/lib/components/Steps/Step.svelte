<script>
  import { cn } from '$lib/utils';

  const { children, class: className, ...restProps } = $props();
</script>

<li
  class={cn(
    'step relative m-0 pb-4 pl-10 pt-1 before:absolute before:left-0 before:top-0 before:flex before:size-8 before:flex-col before:items-center before:justify-center before:rounded-full before:border before:border-main before:bg-neutral-100 before:text-text-body-dark before:content-[counter(steps-counter)] after:absolute after:bottom-2 after:left-[15px] after:top-10 after:w-0 after:border-l after:border-main before:dark:border-main-dark before:dark:bg-neutral-900 dark:before:text-text-body after:dark:border-main-dark',
    className
  )}
  {...restProps}
>
  {@render children()}
</li>

<style>
  :global(li.step) {
    counter-increment: steps-counter;
  }
</style>
