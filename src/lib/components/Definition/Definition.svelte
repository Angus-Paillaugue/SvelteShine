<script>
  import { cn } from '$lib/utils';

  const { name, description, children, class: className, ...restProps } = $props();
</script>

<div
  class={cn('mt-8 rounded border border-main dark:border-main-dark', className)}
  id="definition-{name}"
  {...restProps}
>
  <div
    class="w-fit rounded-br-md rounded-tl-md border-2 border-primary-600 bg-primary-400/50 px-2 text-primary-950 dark:border-primary-400 dark:bg-primary-900/50 dark:text-primary-50"
  >
    <h1 class="m-0 border-none text-xl font-bold">{name}</h1>
  </div>
  {#if description}
    <p class="mx-4 mb-0 mt-5 leading-7">
      {description}
    </p>
  {/if}

  {@render children()}
</div>
