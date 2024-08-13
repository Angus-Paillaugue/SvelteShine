<script>
  import { getTree } from '$lib/pages';
  import Icon from '@iconify/svelte';

  const { slug = $bindable() } = $props();

  const pages = flattenPages(getTree());

  function flattenPages(sidebar) {
    let newPages = [];
    function traverse(items) {
      for (const item of items) {
        if (item.url) {
          newPages.push(item);
        }
        if (item.children) {
          traverse(item.children);
        }
      }
    }
    traverse(sidebar);
    return newPages;
  }

  function getNavigation() {
    const index = pages.findIndex((page) => page.slug == slug);

    const previousPage = pages[index - 1];
    const nextPage = pages[index + 1];
    return { previousPage, nextPage };
  }

  const { previousPage, nextPage } = getNavigation();
</script>

<div class="grid grid-cols-2 gap-4 items-end justify-between py-4 mt-auto">
  {#if previousPage}
    <a
      href={previousPage.url}
      class="p-4 rounded-md border border-neutral-300/50 dark:border-neutral-700/50 hover:gap-4 flex flex-row gap-2 items-center justify-start transition-all"
    >
      <Icon icon="material-symbols:arrow-back-ios-rounded" class="size-8" />
      <div class="flex flex-col justify-end text-start">
        <span class="font-light text-xl text-neutral-500 dark:text-neutral-600">Previous</span>
        <span class="font-semibold text-lg">
          {previousPage.name}
        </span>
      </div>
    </a>
  {/if}
  {#if nextPage}
    <a
      href={nextPage.url}
      class="col-start-2 p-4 rounded-md border border-neutral-300/50 dark:border-neutral-700/50 hover:gap-4 flex flex-row gap-2 items-center justify-end transition-all"
    >
      <div class="flex flex-col justify-end text-end">
        <span class="font-light text-xl text-neutral-500 dark:text-neutral-600">Next</span>
        <span class="font-semibold text-lg">
          {nextPage.name}
        </span>
      </div>
      <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-8" />
    </a>
  {/if}
</div>
