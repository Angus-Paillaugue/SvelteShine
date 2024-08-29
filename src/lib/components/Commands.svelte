<script>
  import { syncKeyStore } from '$lib/stores';
  import { createHighlighter } from 'shiki';
  import { colors } from '$conf';
  import { spring } from 'svelte/motion';
  import { pre as Pre } from './markdown';
  import { Spinner } from '$lib/components';

  const { commands, syncKey } = $props();
  const { codeBlockThemes } = colors;
  const highlighter = createHighlighter({
    themes: Object.values(codeBlockThemes),
    langs: ['bash']
  });

  let selectedIndex = $state(0);
  let commandsContainer = $state();
  let underlineWidth = spring(0, {
    stiffness: 0.1,
    damping: 0.25
  });
  let underlineCoords = spring(0, {
    stiffness: 0.1,
    damping: 0.25
  });

  // Update the underline width and position based on the selected index
  $effect(() => {
    const selectedItem = commandsContainer.querySelector(
      'ul > li:nth-child(' + (selectedIndex + 1) + ')'
    );
    const left = selectedItem.offsetLeft;
    const width = selectedItem.offsetWidth;

    $underlineCoords = left;
    $underlineWidth = width;
  });

  // If a syncKey is provided, create a key in the syncKey store and update the selected index accordingly
  if (syncKey) {
    $syncKeyStore = { [syncKey]: 0 };

    // Set the selected index from the syncKey store
    syncKeyStore.subscribe((value) => {
      if (value[syncKey] !== undefined) {
        selectedIndex = value[syncKey] % commands.length;
      }
    });
  }

  // Update the selected index when the syncKey changes
  $effect(() => {
    if (!syncKey) return;

    // Set the selected index to the syncKey store
    $syncKeyStore[syncKey] = selectedIndex;
  });
</script>

<div class="commands mb-4" bind:this={commandsContainer}>
  <div class="relative h-fit w-full max-w-[500px]">
    <ul
      class="no-scrollbar relative mb-2 flex flex-row flex-nowrap gap-2 border-b-2 border-main dark:border-main-dark"
    >
      {#each commands as command, i}
        <li class="mb-0 list-none">
          <button
            name="Change command"
            onclick={() => (selectedIndex = i)}
            class="lenis-prevent relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
          >
            {command.name}
          </button>
        </li>
      {/each}
    </ul>
    <span
      class="absolute bottom-0 h-[2px] bg-primary-600 dark:bg-primary-400"
      style="left: {$underlineCoords}px; width: {$underlineWidth}px;"
    ></span>
  </div>

  <!-- <div class="overflow-hidden rounded border border-main dark:border-main-dark w-fit"> -->
  <!-- <div class="flex flex-row gap-2 bg-body px-4 py-2 dark:bg-body-dark border-b border-main dark:border-main-dark">
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
    </div> -->
  <Pre class="commands" snippet="true">
    {#await highlighter}
      <div class="m-2">
        <Spinner class="size-6" />
      </div>
    {:then highlighter}
      {@html highlighter.codeToHtml(commands[selectedIndex].command, {
        themes: codeBlockThemes,
        lang: 'bash'
      })}
    {/await}
  </Pre>
  <!-- </div> -->
</div>

<style>
  :global(.codeContainer:has(.commands)) {
    @apply m-0;
  }
  :global(.commands .snippet) {
    @apply m-0;
  }
</style>
