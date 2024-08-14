<script>
  const { children } = $props();
</script>

<div
  class="my-5 flex flex-col gap-4 border-t border-neutral-300/50 px-4 pt-5 dark:border-neutral-700/50"
>
  <p class="mb-0">
    <span class="text-base font-bold text-primary-800 dark:text-primary-600">NOTE :</span>
    {@render children()}
  </p>
</div>
