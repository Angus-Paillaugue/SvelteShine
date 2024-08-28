<script>
  const { children } = $props();
</script>

<!-- TODO : Fix overflow -->
<div class="lenis-prevent my-4 overflow-x-auto">
  <table
    class="w-full table-auto border-collapse overflow-scroll rounded text-left text-sm"
  >
    {@render children()}
  </table>
</div>
