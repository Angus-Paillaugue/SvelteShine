<script>
  // Import code stylesheet
  import '../../../code.css';
  import Sidebar from '$lib/components/core/Sidebar.svelte';
  import Search from '$lib/components/core/Search.svelte';

  let { children, sidebarOpen = $bindable(false) } = $props();
</script>

<Search />

<div class="flex flex-row">
  <Sidebar bind:open={sidebarOpen} />

  {@render children()}
</div>
