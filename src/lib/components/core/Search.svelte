<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { createPostsIndex, searchPostsIndex } from '$lib/search';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';

	let search = $state('loading');
	let searchTerm = $state('');
	let results = $state([]);
  let searchModalShown = $state(false);

  onMount(async() => {
    window.addEventListener("keydown", (e) => {
      if (event.ctrlKey && event.key === "k") {
        e.preventDefault();
        searchModalShown = true;
        setTimeout(() => {
          document.getElementById("search").focus();
        }, 300);
      }
    });
    createPostsIndex();
		search = 'ready';

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchModalShown = false;
      }
    });
  });

  $effect(() => {
    if (search === 'ready') {
      // runs each time `searchTerm` updates
      results = searchPostsIndex(searchTerm)
    }
  });

  afterNavigate(() => {
    if(!searchModalShown) return;
    document.getElementById("search").value = '';
    searchTerm = '';
    searchModalShown = false;
  });
</script>


{#if searchModalShown}
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-end md:justify-center bg-neutral-950/50 backdrop-blur-sm" transition:fly={{ y:"12", duration:300 }}>
    <div class="bg-neutral-100 dark:bg-neutral-800 rounded-t-md w-full max-w-screen-md md:rounded-md dark:text-white text-neutral-900 overflow-hidden">
      <div class="relative w-full">
        <Icon icon="heroicons:magnifying-glass" class="size-6 absolute top-1/2 left-3 -translate-y-1/2" />
        <input type="text" name="search" id="search" class="w-full px-12 py-4 text-xl border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 focus:outline-none {results.length > 0 && "border-b"}" placeholder="Search or pages" autocomplete="off" bind:value={searchTerm}>
        <kbd class="absolute top-1/2 right-3 -translate-y-1/2">ESC</kbd>
      </div>
      {#if results.length > 0}
        <div class="grid grid-cols-1 gap-2 p-4 max-h-[50vh] overflow-y-auto no-scrollbar">
          {#each results as result (result.url)}
            <a
              href={result.url}
              class="list-none w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-800 flex flex-col gap-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 transition-colors"
            >
              <h2 class="m-0">
                {@html result.name}
              </h2>
              <p class="m-0">{@html result.description}</p>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
