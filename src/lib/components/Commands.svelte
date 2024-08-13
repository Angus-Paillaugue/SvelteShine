<script>
  import { newToast } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import { createHighlighter } from 'shiki';
  import { codeBlockTheme } from '$conf';

  const { commands } = $props();

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

<div class="w-full commands mb-4">
  <div class="relative h-fit w-full">
    <ul
      class="flex flex-row no-scrollbar flex-nowrap gap-2 border-b-2 border-neutral-300/50 dark:border-neutral-700/50 mb-2 relative"
    >
      {#each commands as command, i}
        <li class="mb-0 list-none">
          <button
            onclick={() => (selectedIndex = i)}
            class="px-4 py-2 relative overflow-visible cursor-pointer flex flex-row gap-2 items-center text-lg font-bold list-none"
          >
            {command.name}
          </button>
        </li>
      {/each}
    </ul>
    <span
      class="absolute h-[2px] bottom-0 bg-primary-600 dark:bg-primary-400 transition-all"
      bind:this={underlineElement}
    ></span>
  </div>

  <div class="border border-neutral-300/50 dark:border-neutral-700/50 rounded-md overflow-hidden">
    <div class="flex flex-row gap-2 px-4 py-2">
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
      <div class="size-3 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
    </div>
    <div class="relative commands">
      {#await highlighter then highlighter}
        {@html highlighter.codeToHtml(commands[selectedIndex].command, {
          theme: codeBlockTheme,
          lang: 'bash'
        })}
      {/await}

      <!-- Copy command button -->
      <button
        tabindex="0"
        class="h-[2.5rem] bg-neutral-950 text-white rounded-full flex items-center justify-center transition hover:scale-105 active:scale-90 focus:outline-primary-200 p-1 aspect-square absolute top-1/2 right-2 -translate-y-1/2"
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
        <Icon icon="material-symbols:content-copy-outline-rounded" class="w-6 h-6 copy" />
        <Icon icon="material-symbols:check-rounded" class="w-6 h-6 copied hidden" />
      </button>
    </div>
  </div>
</div>
