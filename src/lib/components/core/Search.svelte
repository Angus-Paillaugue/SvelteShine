<script>
  import { onMount } from 'svelte';
  import { scale, fade } from 'svelte/transition';
  import { createPagesIndex, searchPagesIndex } from '$lib/search';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { cn } from '$lib/utils';;

  let search = $state('loading');
  let searchTerm = $state('');
  let results = $state([]);
  let selectedIndex = $state(0);

  onMount(async () => {
    window.addEventListener('keydown', onWindowKeyDown);
    createPagesIndex();
    search = 'ready';

    return () => {
      window.removeEventListener('keydown', onWindowKeyDown);
    }
  });

  function onWindowKeyDown(e) {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      $searchModalShown = true;
      setTimeout(() => {
        document.getElementById('search').focus();
      }, 300);
    } else if (e.key === 'Escape') {
      $searchModalShown = false;
    }
  }

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

  /**
   * Add border to the search container when scrolling the results.
   *
   * @param {Event} e - The scroll event object.
   */
  function onResultsScroll(e) {
    const searchContainer = document.getElementById('searchContainer');
    if (e.target.scrollTop > 0) {
      searchContainer.classList.add('border-neutral-300/50', 'dark:border-neutral-700/50');
    } else {
      searchContainer.classList.remove('border-neutral-300/50', 'dark:border-neutral-700/50');
    }
  }

  /**
   * Handles key down events of the input.
   *
   * @param {KeyboardEvent} event - The key down event.
   */
  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % results.length;
      scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      selectedIndex = (selectedIndex - 1 + results.length) % results.length;
      scrollToSelected();
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      document.getElementById(`result-${selectedIndex}`).click();
    }
  }

  /**
   * Function to scroll to the selected search result.
   */
  function scrollToSelected() {
    const selectedElement = document.getElementById(`result-${selectedIndex}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }
</script>

{#if $searchModalShown}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-neutral-950/20 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={() => ($searchModalShown = false)}
  ></div>
  <div class="fixed inset-0 z-50 p-4 sm:p-6 md:p-12">
    <div
      class="no-scrollbar mx-auto max-h-full w-full max-w-screen-md overflow-hidden overflow-y-auto rounded-2xl border border-neutral-300/50 bg-neutral-100 dark:border-neutral-700/50 dark:bg-neutral-950 dark:text-white"
      transition:scale={{ start: 0.8, duration: 200 }}
      onscroll={onResultsScroll}
    >
      <div
        class="sticky top-0 z-10 w-full border-b border-transparent bg-neutral-100 p-2 transition-all dark:bg-neutral-950"
        id="searchContainer"
      >
        <div class="relative">
          <Icon
            icon="line-md:search"
            class="absolute left-3 top-1/2 size-4 -translate-y-1/2 md:size-6"
          />
          <input
            type="text"
            name="search"
            id="search"
            class={cn("w-full rounded-xl border border-neutral-300/50 bg-transparent py-4 pl-10 text-xl focus:outline-none dark:border-neutral-700/50 dark:bg-transparent md:px-12", results.length >
              0 && 'border-b')}
            placeholder="Search or pages"
            autocomplete="off"
            onkeydown={handleKeyDown}
            onblur={() => (selectedIndex = 0)}
            bind:value={searchTerm}
          />
          <kbd class="absolute right-3 top-1/2 hidden -translate-y-1/2 md:block">ESC</kbd>
        </div>
      </div>
      {#if results.length > 0}
        <div class="p-2" id="results">
          {#each results as result, index}
            <a
              href={result.url}
              class={cn("group relative m-0 flex list-none flex-row items-center justify-between rounded-xl p-2 px-4 py-2 transition-colors hover:bg-neutral-300/50 focus:bg-neutral-300/50 focus:outline-none dark:hover:bg-neutral-800/50 dark:focus:bg-neutral-800/50",  index ===
                selectedIndex && 'selected bg-neutral-300/50 dark:bg-neutral-800/50')}
              id={`result-${index}`}
            >
              <div class="flex w-full list-none flex-col justify-center gap-2 rounded-md">
                <h2 class="m-0 line-clamp-1 truncate">
                  {@html result.name}
                </h2>
                <p class="m-0 line-clamp-1 truncate">{@html result.description}</p>
              </div>
              <Icon
                icon="material-symbols:arrow-forward-ios-rounded"
                class="text-primary-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 dark:text-primary-600 [.group.selected_&]:opacity-100"
              />
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
