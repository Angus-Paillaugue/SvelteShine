<script>
  const { type, path, default: defaultValue, required = false, children, class:className, ...restProps } = $props();
</script>

<div class={cn("my-5 border-t border-neutral-300/50 px-4 pt-5 dark:border-neutral-700/50", className)} {...restProps}>
  <div class="flex flex-wrap items-center gap-2">
    <span class="font-bold text-primary-800 dark:text-primary-600">
      {path}
    </span>
    <div class="flex items-center space-x-2 text-xs font-medium">
      <div
        class="rounded-md border-neutral-700 bg-neutral-600/20 px-2 py-0.5 text-neutral-900 dark:text-neutral-100"
      >
        {type}
      </div>
      {#if required}
        <div
          class="rounded-md border-red-700 bg-red-600/20 px-2 py-0.5 text-red-900 dark:text-red-100"
        >
          Required
        </div>
      {/if}
      {#if defaultValue}
        <div
          class="rounded-md border-primary-700 bg-primary-600/20 px-2 py-0.5 text-primary-900 dark:text-primary-100"
        >
          Default: {defaultValue}
        </div>
      {/if}
    </div>
  </div>
  <p class="m-0 mt-2 text-neutral-700 dark:text-neutral-400">{@render children()}</p>
</div>
