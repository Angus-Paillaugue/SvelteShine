<script>
  import { toggleMode, mode } from 'mode-watcher';
  import { scale } from 'svelte/transition';
  import { socials, socialsTarget } from '$conf';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { Button } from '$lib/components';

  let { title } = $props();
</script>

<nav
  class="w-full px-4 sticky top-0 z-40 max-xl:h-16 xl:p-4 bg-white dark:bg-neutral-900 flex flex-row justify-between items-center border-b border-neutral-300/50 dark:border-neutral-700/50"
>
  <div class="flex flex-row gap-2 max-xl:pl-12">
    <h1 class="m-0">{title}</h1>
  </div>

  <div class="flex flex-row gap-2 items-center max-xl:hidden">
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

    <Button onclick={() => ($searchModalShown = true)} type={['square', 'ghost']} name="search">
      <Icon icon="line-md:search" class="size-6" />
    </Button>
  </div>
</nav>
