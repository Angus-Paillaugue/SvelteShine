<script>
  // Import code stylesheet
  import '../../../code.css';
  import Sidebar from '$lib/components/core/Sidebar.svelte';
  import Search from '$lib/components/core/Search.svelte';
  import { sidebarStyle } from '$conf';

  let { children, sidebarOpen = $bindable(false) } = $props();
</script>

<Search />

<div class="flex flex-row">
  <Sidebar bind:open={sidebarOpen} style={sidebarStyle} />

  {@render children()}
</div>
