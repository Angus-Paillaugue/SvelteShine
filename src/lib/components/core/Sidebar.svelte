<script>
  import { getTree } from '$lib/pages';
  import PageList from './PageList.svelte';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';

  const pages = getTree();
  let { open = $bindable(false) } = $props();

  afterNavigate(() => {
    if (open) open = false;
  });
</script>

<aside
  class="h-screen p-2 flex flex-col gap-0 md:w-[300px] max-md:top-16 pl-0 z-40 fixed md:sticky max-md:inset-0 bg-white dark:bg-neutral-900 transition-transform {open
    ? 'max-md:translate-x-0'
    : 'max-md:-translate-x-full'} top-0 border-r border-neutral-300 dark:border-neutral-800 shrink-0"
>
  <PageList {pages} root={true} />
</aside>

<button
  class="h-12 aspect-square flex flex-col items-center justify-center md:hidden fixed z-50 top-[0.5rem] left-[0.5rem]"
  onclick={() => (open = !open)}
>
  <Icon icon="ri:menu-line" class="size-6" />
</button>
