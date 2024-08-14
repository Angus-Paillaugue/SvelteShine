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
  class="fixed top-0 z-40 flex h-screen shrink-0 flex-col justify-between gap-0 overflow-y-auto border-r border-neutral-300/50 bg-white p-2 max-xl:pb-[58px] pl-0 transition-transform dark:border-neutral-700/50 dark:bg-neutral-900 max-xl:inset-0 max-xl:top-[3.8rem] max-xl:pt-0 xl:sticky xl:w-[300px] {open
    ? 'max-xl:translate-x-0'
    : 'max-xl:-translate-x-full'}"
>
  <Sidebar.PageList {pages} root={true} {style} />
  <!-- Navbar right side on desktop is on the sidebar on mobile -->
  <div
    class="sticky bottom-0 left-0 right-0 flex flex-row items-center justify-end gap-2 bg-inherit p-2 pr-0 xl:hidden"
  >
    {#each socials as { name, url, icon }}
      <a href={url} target={socialsTarget} class="h-fit p-1" {name}>
        <Icon {icon} class="size-6" />
      </a>
    {/each}

    <!-- Vertical separator -->
    {#if socials.length > 0}
      <span class="h-10 w-px bg-neutral-300/50 dark:bg-neutral-700/50"></span>
    {/if}

    <!-- Toggle mode button -->
    <Button
      name="toggleMode"
      onclick={toggleMode}
      type={['square', 'ghost']}
      class="bg-neutral-200/50 hover:bg-transparent dark:bg-neutral-700/50 hover:dark:bg-transparent"
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
  class="fixed left-[0.5rem] top-[0.5rem] z-50 flex aspect-square h-12 flex-col items-center justify-center xl:hidden"
  onclick={() => (open = !open)}
  name="search"
>
  <Icon icon="line-md:menu" class="size-6" />
</button>
