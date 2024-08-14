<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { scale } from 'svelte/transition';
  import { socials, socialsTarget } from '$conf';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { Button } from '$lib/components';

  const { title } = $props();
</script>

<nav
  class="sticky top-0 z-20 flex w-full flex-row items-center justify-between border-b border-neutral-300/50 bg-white/75 px-4 dark:border-neutral-700/50 dark:bg-neutral-900/75 backdrop-blur h-16 xl:h-24"
>
  <div class="flex flex-row gap-2 ml-4 max-xl:ml-12">
    <h1 class="m-0 max-md:text-2xl line-clamp-1 truncate">{title}</h1>
  </div>

  <div class="flex flex-row items-center gap-2 max-xl:hidden">
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

    <Button onclick={() => ($searchModalShown = true)} type={['square', 'ghost']} name="search">
      <Icon icon="line-md:search" class="size-6" />
    </Button>
  </div>
</nav>
