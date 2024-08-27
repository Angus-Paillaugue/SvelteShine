<script>
  import { getTree } from '$lib/pages';
  import Sidebar from './';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { toggleMode, mode } from 'mode-watcher';
  import { sideBar, project } from '$conf';
  import { scale } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { cn } from '$lib/utils';

  const pages = getTree();
  let theme = $state('dark');
  let { open = $bindable(false), style = 'details' } = $props();

  // Close the mobile sidebar on navigation
  afterNavigate(() => {
    if (open) open = false;
  });

  // Watch for mode changes
  $effect(() => {
    theme = $mode;
  });
</script>

<aside
  class={cn(
    'fixed top-0 z-[45] flex shrink-0 flex-col gap-0 border-r border-main bg-body p-2 pl-0 transition-transform dark:border-main-dark dark:bg-body-dark max-xl:inset-0 max-xl:top-16 max-xl:-mt-1 max-xl:flex max-xl:flex-col max-xl:pb-0 max-xl:pt-0 lg:max-h-screen xl:sticky xl:w-[300px]',
    open ? 'max-xl:translate-x-0' : 'max-xl:-translate-x-full'
  )}
>
  <!-- Sidebar heading -->
  <div class="flex flex-col pl-4 pr-2 pt-4">
    <a href="/">
      <h3 class="m-0 flex flex-row items-center gap-4">
        <img
          src="/logos/{theme}.svg"
          alt="{project.name}'s logo"
          class="h-8 w-12 object-contain"
        />
        {project.name}
      </h3>
    </a>
    <span class="mb-2 mt-4 grow border-b border-main dark:border-main-dark"></span>
  </div>
  <div class="lenis-prevent grow overflow-y-auto">
    <Sidebar.PageList {pages} root={true} {style} />
  </div>
  <!-- Navbar right side on desktop is on the sidebar on mobile -->
  <div class="flex flex-row items-center justify-end gap-2 bg-inherit p-2 pr-0 xl:hidden">
    {#each sideBar.socials.list as { name, url, icon }}
      <a href={url} target={sideBar.socials.target} class="h-fit p-1" aria-label="{name} link">
        <Icon {icon} class="size-6" />
      </a>
    {/each}

    <!-- Vertical separator -->
    {#if sideBar.socials.list.length > 0}
      <span class="h-10 w-px bg-neutral-300/50 dark:bg-neutral-700/50"></span>
    {/if}

    <!-- Toggle mode button -->
    <Button
      name="Toggle mode"
      onclick={toggleMode}
      type="square ghost"
      class="bg-neutral-200/50 hocus:bg-transparent dark:bg-neutral-700/50 hocus:dark:bg-transparent"
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

    <Button onclick={() => ($searchModalShown = true)} name="Open search" type="square ghost">
      <Icon icon="line-md:search" class="size-6" />
    </Button>
  </div>
</aside>

<!-- Open mobile sidebar button -->
<button
  class="fixed left-[0.5rem] top-[0.5rem] z-30 flex aspect-square h-12 flex-col items-center justify-center xl:hidden"
  onclick={() => (open = !open)}
  id="openSidebar"
  name="Open sidebar"
  aria-label="Open sidebar"
>
  <Icon icon="line-md:menu" class="size-6" />
</button>
