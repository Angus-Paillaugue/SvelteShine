<script>
  import Search from '$lib/components/core/Search.svelte';
  import Sidebar from '$lib/components/core/Sidebar';
  import { sideBar } from '$conf';

  let { children } = $props();
  let sidebarOpen = $state(false);
</script>

<Search />

<div class="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-row">
  <!-- Sidebar in layout to not reload images and icons when navigating -->
  <Sidebar open={sidebarOpen} style={sideBar.style} />

  {@render children()}
</div>
