<script>
  import Search from '$lib/components/core/Search.svelte';

  let { children } = $props();
</script>

<Search />

{@render children()}
