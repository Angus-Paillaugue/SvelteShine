<script>
  const { children } = $props();
</script>

<!-- TODO : Fix overflow -->
<div class="overflow-x-scroll w-full lenis-prevent">
  <table class="my-4 w-full table-auto overflow-scroll border-collapse rounded text-left text-sm">
    {@render children()}
  </table>
</div>
