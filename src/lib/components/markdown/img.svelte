<script>
  import { scale } from 'svelte/transition';

  const { src, alt, 'data-caption': caption } = $props();
  let zoomed = $state(false);
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'Escape') zoomed = false;
  }}
/>

<button
  aria-label="Zoom on image"
  onclick={() => (zoomed = true)}
  class="mb-4 rounded border border-main bg-neutral-100 p-2 dark:border-main-dark dark:bg-neutral-900"
>
  <figure {alt}>
    <img {src} {alt} class="cursor-zoom-in rounded object-contain" />
    {#if caption}
      <figcaption
        class="relative mt-2 block justify-center rounded-xl px-8 text-center text-base text-gray-700 dark:text-gray-400"
      >
        {caption}
      </figcaption>
    {/if}
  </figure>
</button>

{#if zoomed}
  <div
    class="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center bg-neutral-300/50 transition-all duration-300 dark:bg-neutral-800/50"
    transition:scale
  >
    <img {src} {alt} class="object-contain" />
  </div>
{/if}
