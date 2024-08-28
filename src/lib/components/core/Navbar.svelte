<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { scale } from 'svelte/transition';
  import { sideBar } from '$conf';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { Button } from '$lib/components';

  const { title } = $props();
</script>

<nav
  class="bg-main/50 dark:bg-main-dark/50 sticky top-0 z-20 flex h-16 w-full flex-row items-center justify-between border-b border-main px-4 backdrop-blur dark:border-main-dark xl:h-24"
>
  <div class="ml-4 flex flex-row gap-2 max-xl:ml-12">
    <h1 class="m-0 line-clamp-1 truncate max-md:text-2xl">{title}</h1>
  </div>

  <div class="flex flex-row items-center gap-2 max-xl:hidden">
    {#each sideBar.socials.list as { name, url, icon }}
      <a
        href={url}
        target={sideBar.socials.target ?? '_self'}
        class="h-fit rounded p-2"
        aria-label="{name} link"
      >
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
      class="bg-neutral-200/50 hocus:bg-transparent dark:bg-neutral-700/50 dark:hocus:bg-transparent"
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

    <Button
      onclick={() => ($searchModalShown = true)}
      name="Open Search"
      type="square ghost"
      id="search"
    >
      <Icon icon="line-md:search" class="size-6" />
    </Button>
  </div>
</nav>
