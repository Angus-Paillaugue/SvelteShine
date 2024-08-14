<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { createPagesIndex, searchPagesIndex } from '$lib/search';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';

  let search = $state('loading');
  let searchTerm = $state('');
  let results = $state([]);
  let currentlyFocusedSearchResult = $state(0);

  onMount(async () => {
    window.addEventListener('keydown', (e) => {
      if (event.ctrlKey && event.key === 'k') {
        e.preventDefault();
        $searchModalShown = true;
        setTimeout(() => {
          document.getElementById('search').focus();
        }, 300);
      } else if (e.key === 'Escape') {
        $searchModalShown = false;
      }
    });
    createPagesIndex();
    search = 'ready';
  });

  $effect(() => {
    if (search === 'ready') {
      // runs each time `searchTerm` updates
      results = searchPagesIndex(searchTerm);
    }
  });

  afterNavigate(() => {
    if (!$searchModalShown) return;
    document.getElementById('search').value = '';
    searchTerm = '';
    $searchModalShown = false;
  });
</script>

{#if $searchModalShown}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[52] bg-neutral-950/50 backdrop-blur-sm"
    transition:fade={{ duration: 300 }}
    onclick={() => ($searchModalShown = false)}
  ></div>
  <div
    class="fixed z-[52] w-full max-w-screen-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 dark:text-white max-md:left-0 max-md:right-0 max-md:top-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md md:rounded-t-md"
    transition:fly={{ y: '12', duration: 300 }}
  >
    <div class="relative w-full">
      <Icon icon="line-md:search" class="absolute left-3 top-1/2 size-6 -translate-y-1/2" />
      <input
        type="text"
        name="search"
        id="search"
        class="w-full bg-neutral-100 px-12 py-4 text-xl focus:outline-none dark:bg-neutral-800 {results.length >
          0 && 'border-b'}"
        placeholder="Search or pages"
        autocomplete="off"
        bind:value={searchTerm}
      />
      <kbd class="absolute right-3 top-1/2 hidden -translate-y-1/2 md:block">ESC</kbd>
    </div>
    {#if results.length > 0}
      <div
        class="no-scrollbar grid max-h-[50vh] grid-cols-1 gap-2 overflow-y-auto p-4"
        id="results"
      >
        {#each results as result (result.url)}
          <a
            href={result.url}
            class="flex w-full list-none flex-col gap-2 rounded-md border border-neutral-300/50 p-2 transition-colors hover:bg-neutral-300/50 dark:border-neutral-700/50 dark:hover:bg-neutral-700/50"
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
{/if}
