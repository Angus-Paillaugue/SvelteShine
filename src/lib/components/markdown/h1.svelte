<script>
  import { onMount } from "svelte";

  const { children, } = $props();
  let heading = $state();

  onMount(() => {
    heading.id = heading.innerText.toLowerCase().replace(/ /g, "-");
  });
</script>

<h1 class="border-b border-main leading-[3rem] dark:border-main-dark" bind:this={heading}>
  {@render children()}
</h1>
