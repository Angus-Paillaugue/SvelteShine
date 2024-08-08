<script>
  // Import code stylesheet
  import '../../../code.css';
  import Sidebar from '$lib/components/core/Sidebar.svelte';

  const { children } = $props();
</script>

<div class="flex flex-col lg:flex-row">
  <Sidebar />

  {@render children()}
</div>
