<script>
  import { cn } from '$lib/utils';

  const { children, class:className, ...restProps } = $props();
</script>


<ol role="list" class={cn("list-none steps", className)} {...restProps}>
  {@render children()}
</ol>

<style>
  :global(ol.steps) {
    counter-reset: steps-counter;
  }
</style>
