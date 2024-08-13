<script>
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components';

  let count = $state(0);
</script>

<section class="flex flex-row gap-4 items-center w-fit">
  <Button onclick={() => (count = Math.max(0, count - 1))} type="square">
    <Icon icon="ri:subtract-line" class="size-6" />
  </Button>

  <span class="text-xl font-bold">
    {count}
  </span>

  <Button onclick={() => count++} type="square">
    <Icon icon="ri:add-large-line" class="size-6" />
  </Button>
</section>
