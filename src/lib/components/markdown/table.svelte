<script>
  const { children } = $props();
</script>

<!-- TODO : Fix overflow -->
<div class="overflow-x-auto lenis-prevent my-4">
  <table
    class="table-auto w-full border-collapse overflow-scroll rounded text-left text-sm"
  >
    {@render children()}
  </table>
</div>