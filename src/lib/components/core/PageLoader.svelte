<script>
  import { navigating } from '$app/stores';
  import { Spinner } from '$lib/components';
</script>

{#if $navigating}
  <div
    class="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-body text-text-heading dark:bg-body-dark dark:text-text-heading-dark"
  >
    <Spinner class="size-12" />
  </div>
{/if}
