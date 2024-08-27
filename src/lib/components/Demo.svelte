<script>
  import { createHighlighter } from 'shiki';
  import { colors } from '$conf';
  import ComponentPreview from './ComponentPreview.svelte';
  import { spring } from 'svelte/motion';
  import { pre as Pre } from './markdown';
  import { cn } from '$lib/utils';

  const { name, lang = 'svelte', container = true } = $props();

  const component = async () => await import(`../Demos/${name}.svelte`).then((m) => m.default);
  const raw = async () => await import(`../Demos/${name}.svelte?raw`).then((m) => m.default);

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

  const { codeBlockTheme } = colors;
  const highlighter = createHighlighter({
    themes: [codeBlockTheme],
    langs: [lang]
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
</script>

<div class="demo flex flex-col gap-4" bind:this={commandsContainer}>
  <div class="relative">
    <span
      class="absolute bottom-0 h-[2px] bg-primary-600 dark:bg-primary-400"
      style="left: {$underlineCoords}px; width: {$underlineWidth}px;"
    ></span>
    <ul class="flex flex-row border-b border-main py-2 dark:border-main-dark">
      <li class="mb-0 list-none">
        <button
          name="Preview demo"
          onclick={() => (selectedIndex = 0)}
          class="lenis-prevent relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
        >
          Preview
        </button>
      </li>
      <li class="mb-0 list-none">
        <button
          name="View code"
          onclick={() => (selectedIndex = 1)}
          class="lenis-prevent relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
        >
          Code
        </button>
      </li>
    </ul>
  </div>
  <div
    class={cn(
      'demoContainer overflow-hidden rounded-xl',
      !container && 'border border-main p-4 dark:border-main-dark'
    )}
  >
    {#if selectedIndex === 0}
      {#await component()}
        <!-- TODO : add animated loader -->
        <p>Loading...</p>
      {:then Component}
        {#if container}
          <ComponentPreview>
            <Component />
          </ComponentPreview>
        {:else}
          <Component />
        {/if}
      {:catch}
        <p>Demo not found.</p>
      {/await}
    {:else}
      {#await raw()}
        <!-- TODO : add animated loader -->
        <p>Loading...</p>
      {:then rawFile}
        <Pre class="lenis-prevent h-[20rem] overflow-y-auto rounded-xl lg:h-[28rem]">
          {#await highlighter then highlighter}
            {@html highlighter.codeToHtml(rawFile, {
              theme: codeBlockTheme,
              lang
            })}
          {/await}
        </Pre>
      {:catch}
        <!-- TODO : make it prettier -->
        <p>Demo not found.</p>
      {/await}
    {/if}
  </div>
</div>

<style>
  :global(.demoContainer > *) {
    margin: 0 !important;
  }
</style>
