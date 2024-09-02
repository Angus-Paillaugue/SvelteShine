<script>
  import { cn } from '$lib/utils';

  const { children, class: className, ...restProps } = $props();
</script>

<div
  class={cn(
    'note my-5 flex flex-col gap-4 border-t border-main px-4 pt-5 dark:border-main-dark',
    className
  )}
  role="note"
  {...restProps}
>
  <span class="text-base font-bold text-primary-800 dark:text-primary-600"
    >NOTE :</span
  >
  {@render children()}
</div>

<style>
  :global(.note p) {
    margin: 0;
  }
</style>
