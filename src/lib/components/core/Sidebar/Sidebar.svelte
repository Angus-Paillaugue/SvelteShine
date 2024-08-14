<script>
  import { getTree } from '$lib/pages';
  import Sidebar from './';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { toggleMode, mode } from 'mode-watcher';
  import { socials, socialsTarget } from '$conf';
  import { scale } from 'svelte/transition';
  import { Button } from '$lib/components';

  const pages = getTree();
  let { open = $bindable(false), style = 'details' } = $props();

  afterNavigate(() => {
    if (open) open = false;
  });
</script>

<aside
  class="h-screen p-2 max-xl:pt-0 flex flex-col gap-0 xl:w-[300px] max-xl:top-[3.8rem] pb-[58px] overflow-y-auto pl-0 z-40 fixed xl:sticky max-xl:inset-0 bg-white dark:bg-neutral-900 transition-transform top-0 border-r border-neutral-300/50 dark:border-neutral-700/50 shrink-0 justify-between {open
    ? 'max-xl:translate-x-0'
    : 'max-xl:-translate-x-full'}"
>
  <Sidebar.PageList {pages} root={true} {style} />
  <!-- Navbar right side on desktop is on the sidebar on mobile -->
  <div
    class="flex flex-row gap-2 items-center justify-end xl:hidden sticky bottom-0 left-0 right-0 bg-inherit p-2 pr-0"
  >
    {#each socials as { name, url, icon }}
      <a href={url} target={socialsTarget} class="h-fit p-1" {name}>
        <Icon {icon} class="size-6" />
      </a>
    {/each}

    <!-- Vertical separator -->
    {#if socials.length > 0}
      <span class="w-px h-10 bg-neutral-300/50 dark:bg-neutral-700/50"></span>
    {/if}

    <!-- Toggle mode button -->
    <Button
      name="toggleMode"
      onclick={toggleMode}
      type={['square', 'ghost']}
      class="bg-neutral-200/50 dark:bg-neutral-700/50 hover:bg-transparent hover:dark:bg-transparent"
    >
      {#if $mode === 'dark'}
        <div in:scale>
          <Icon icon="line-md:sunny-outline-loop" class="size-6" />
        </div>
      {:else}
        <div in:scale>
          <Icon icon="line-md:moon-alt-loop" class="size-6" />
        </div>
      {/if}
    </Button>

    <Button onclick={() => ($searchModalShown = true)} type={['square', 'ghost']}>
      <Icon icon="line-md:search" class="size-6" />
    </Button>
  </div>
</aside>

<button
  class="h-12 aspect-square flex flex-col items-center justify-center xl:hidden fixed z-50 top-[0.5rem] left-[0.5rem]"
  onclick={() => (open = !open)}
  name="search"
>
  <Icon icon="line-md:menu" class="size-6" />
</button>
