<script>
  import { newToast } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { createHighlighter } from 'shiki';
  import { colors } from '$conf';

  const { commands } = $props();

  const { codeBlockTheme } = colors;
  let selectedIndex = $state(0);
  let underlineElement = $state();
  const highlighter = createHighlighter({
    themes: [codeBlockTheme],
    langs: ['bash']
  });

  $effect(() => {
    const selectedItem = document.querySelector('ul > li:nth-child(' + (selectedIndex + 1) + ')');
    const left = selectedItem.offsetLeft;
    const width = selectedItem.offsetWidth;

    underlineElement.style.left = left + 'px';
    underlineElement.style.width = width + 'px';
  });
</script>

<div class="commands mb-4 w-full">
  <div class="relative h-fit w-full">
    <ul
      class="no-scrollbar relative mb-2 flex flex-row flex-nowrap gap-2 border-b-2 border-main dark:border-main-dark"
    >
      {#each commands as command, i}
        <li class="mb-0 list-none">
          <button
            onclick={() => (selectedIndex = i)}
            class="relative flex cursor-pointer list-none flex-row items-center gap-2 overflow-visible px-4 py-2 text-lg font-bold"
          >
            {command.name}
          </button>
        </li>
      {/each}
    </ul>
    <span
      class="absolute bottom-0 h-[2px] bg-primary-600 transition-all dark:bg-primary-400"
      bind:this={underlineElement}
    ></span>
  </div>

  <div class="overflow-hidden rounded-md border border-main dark:border-main-dark">
    <div class="flex flex-row gap-2 px-4 py-2">
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
      <div class="size-3 rounded-full bg-neutral-300 dark:bg-neutral-800"></div>
    </div>
    <div class="commands relative">
      {#await highlighter then highlighter}
        {@html highlighter.codeToHtml(commands[selectedIndex].command, {
          theme: codeBlockTheme,
          lang: 'bash'
        })}
      {/await}

      <!-- Copy command button -->
      <button
        tabindex="0"
        class="absolute right-2 top-1/2 flex aspect-square h-[2.5rem] -translate-y-1/2 items-center justify-center rounded-full bg-neutral-950 p-1 text-white transition hover:scale-105 focus:outline-primary-200 active:scale-90"
        onclick={(e) => {
          const copyButton = e.target.closest('button');
          copyButton.querySelector('.copy').classList.add('hidden');
          copyButton.querySelector('.copied').classList.remove('hidden');
          const textToCopy = copyButton.parentElement.querySelector('code').innerText;
          // Write the code to clipboard
          navigator.clipboard.writeText(textToCopy);
          // Show toast
          newToast({
            title: 'Copied to clipboard',
            message: 'The code has been copied to your clipboard',
            type: 'green'
          });
          setTimeout(() => {
            // Reset the button icon back to default
            copyButton.querySelector('.copy').classList.remove('hidden');
            copyButton.querySelector('.copied').classList.add('hidden');
          }, 2000);
        }}
      >
        <Icon icon="material-symbols:content-copy-outline-rounded" class="copy h-6 w-6" />
        <Icon icon="material-symbols:check-rounded" class="copied hidden h-6 w-6" />
      </button>
    </div>
  </div>
</div>
