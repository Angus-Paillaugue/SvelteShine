<script>
  import Icon from '@iconify/svelte';

  let count = $state(0);
</script>

<section class="flex flex-row gap-4 items-center">
  <button
    onclick={() => (count = Math.max(0, count - 1))}
    class="rounded-md bg-primary-300 dark:bg-primary-700 p-2 transition-all active:scale-90"
  >
    <Icon icon="ri:subtract-line" class="size-6" />
  </button>

  <span class="text-xl font-bold">
    {count}
  </span>

  <button
    onclick={() => count++}
    class="rounded-md bg-primary-300 dark:bg-primary-700 p-2 transition-all active:scale-90"
  >
    <Icon icon="ri:add-large-line" class="size-6" />
  </button>
</section>
