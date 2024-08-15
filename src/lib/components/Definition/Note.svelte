<script>
  import { cn } from '$lib/utils';

  const { children, class: className, ...restProps } = $props();
</script>

<div
  class={cn(
    'my-5 flex flex-col gap-4 border-t border-main px-4 pt-5 dark:border-main-dark',
    className
  )}
  {...restProps}
>
  <p class="mb-0">
    <span class="text-base font-bold text-primary-800 dark:text-primary-600">NOTE :</span>
    {@render children()}
  </p>
</div>
