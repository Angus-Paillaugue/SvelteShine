<script>
  const { children } = $props();
</script>

<!-- TODO : Fix overflow -->
<div class="lenis-prevent w-full overflow-x-scroll">
  <table class="my-4 w-full table-auto border-collapse overflow-scroll rounded text-left text-sm">
    {@render children()}
  </table>
</div>
