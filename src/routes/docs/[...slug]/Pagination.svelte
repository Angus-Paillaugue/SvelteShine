<script>
  import { getTree } from '$lib/pages';
  import Icon from '@iconify/svelte';
  import { flattenPages } from '$lib/utils';

  const { slug = $bindable() } = $props();

  const pages = flattenPages(getTree());

  /**
   *
   * @function getNavigation
   * @description Retrieves the navigation data.
   * @returns {Object} The navigation data.
   */
  function getNavigation() {
    const index = pages.findIndex((page) => page.slug == slug);

    const previousPage = pages[index - 1];
    const nextPage = pages[index + 1];
    return { previousPage, nextPage };
  }

  const { previousPage, nextPage } = getNavigation();
</script>

<div class="mt-auto grid grid-cols-2 items-end justify-between gap-4 py-4">
  {#if previousPage}
    <a
      href={previousPage.url}
      class="flex h-full flex-row items-center justify-start gap-2 rounded-md border border-main p-2 transition-all hover:gap-4 dark:border-main-dark md:p-4"
    >
      <Icon
        icon="material-symbols:arrow-back-ios-rounded"
        class="size-8 text-neutral-500 dark:text-neutral-600"
      />
      <div class="flex flex-col justify-end text-start">
        <span class="text-xl font-light text-neutral-500 dark:text-neutral-600">Previous</span>
        <span class="text-lg font-semibold">
          {previousPage.name}
        </span>
      </div>
    </a>
  {/if}
  {#if nextPage}
    <a
      href={nextPage.url}
      class="col-start-2 flex h-full flex-row items-center justify-end gap-2 rounded-md border border-main p-2 transition-all hover:gap-4 dark:border-main-dark md:p-4"
    >
      <div class="flex flex-col justify-end text-end">
        <span class="text-xl font-light text-neutral-500 dark:text-neutral-600">Next</span>
        <span class="text-lg font-semibold">
          {nextPage.name}
        </span>
      </div>
      <Icon
        icon="material-symbols:arrow-forward-ios-rounded"
        class="size-8 text-neutral-500 dark:text-neutral-600"
      />
    </a>
  {/if}
</div>
