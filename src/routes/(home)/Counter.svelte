<script>
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components';

  let count = $state(0);
</script>

<section class="flex w-fit flex-row items-center gap-4">
  <Button onclick={() => (count = Math.max(0, count - 1))} name="Decrement counter" type="square">
    <Icon icon="ri:subtract-line" class="size-6" />
  </Button>

  <span class="text-xl font-bold">
    {count}
  </span>

  <Button onclick={() => count++} name="Increment counter" type="square">
    <Icon icon="ri:add-large-line" class="size-6" />
  </Button>
</section>
