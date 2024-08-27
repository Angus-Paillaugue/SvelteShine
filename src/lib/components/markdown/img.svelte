<script>
  import { scale } from "svelte/transition";

  const { src, alt, "data-caption" : caption } = $props();
  let zoomed = $state(false)
</script>

<svelte:window onkeydown={(e) => {if(e.key === 'Escape') zoomed = false}} />

<button aria-label="Zoom on image" onclick={() => (zoomed = true)} class="mb-4 rounded border border-main bg-neutral-100 p-2 dark:border-main-dark dark:bg-neutral-950">
  <figure {alt}>
    <img src={src} {alt} class="object-contain cursor-zoom-in rounded" />
    {#if caption}
      <figcaption class="relative mt-2 block justify-center rounded-xl px-8 text-center text-base text-gray-700 dark:text-gray-400">{caption}</figcaption>
    {/if}
  </figure>
</button>

{#if zoomed}
  <div class="inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 flex-col items-center justify-center flex cursor-zoom-out" transition:scale>
    <img src={src} {alt} class="object-contain"  />
  </div>
{/if}
