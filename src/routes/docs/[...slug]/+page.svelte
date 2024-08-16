<script>
  import { formatDate, addCopyCodeButtonFunctionality } from '$lib/utils';
  import Navbar from '$lib/components/core/Navbar.svelte';
  import Sidebar from '$lib/components/core/Sidebar';
  import { sideBar } from '$conf';
  import { Button } from '$lib/components/';
  import { project } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import Pagination from './Pagination.svelte';
  import Toc from './Toc.svelte';
  import Icon from '@iconify/svelte';

  const { data } = $props();
  let headings = $state([]);
  let mobileTocVisible = $state(false);
  let sidebarOpen = $state(false);

  afterNavigate(() => {
    addCopyCodeButtonFunctionality();
    const pageContainer = document.querySelector('#pageContainer');
    const allowedElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const disallowedSelectors = [
      allowedElements.map((element) => '.collapsible ' + element).join(', ')
    ];
    const headingElements = pageContainer.querySelectorAll(
      allowedElements
        .map((element) => element + '[id]:not(' + disallowedSelectors.join(', ') + ')')
        .join(', ')
    );
    headings = createHeadingTree(headingElements);

    window.addEventListener('click', windowClickHandler);

    return () => {
      window.removeEventListener('click', windowClickHandler);
    };
  });

  /**
   * Handles the click event on the window.
   *
   * @param {Event} e - The click event object.
   */
  function windowClickHandler(e) {
    if (e.target.closest('#toc-container')) {
      mobileTocVisible = false;
    }
  }

  /**
   * Creates a heading tree from the given headings.
   *
   * @param {Array} headings - The array of headings.
   * @returns {Object} - The heading tree.
   */
  function createHeadingTree(headings) {
    const stack = [];
    const root = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      const item = {
        id: heading.id,
        text: heading.textContent,
        level,
        children: []
      };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length) {
        stack[stack.length - 1].children.push(item);
      } else {
        root.push(item);
      }

      stack.push(item);
    });

    return root;
  }
</script>

<svelte:head>
  <title>{data?.name ?? 'Docs'}</title>
  <meta property="og:title" content={data?.name ?? 'Docs'} />
  <meta property="twitter:title" content={data?.name ?? 'Docs'} />

  <meta name="description" content={data?.description ?? project.description} />
  <meta property="og:description" content={data?.description ?? project.description} />
  <meta property="twitter:description" content={data?.description ?? project.description} />
  <!-- Adding katex stylesheet for math support -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
    integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
    crossorigin="anonymous"
  />
</svelte:head>

{#key data?.name}
  <div class="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-row">
    <Sidebar open={sidebarOpen} style={sideBar.style} />

    <div class="flex grow flex-col">
      <Navbar title={data?.name ?? 'Docs'} />

      <div
        class="flex h-full flex-col-reverse justify-center max-lg:items-center lg:flex-row lg:gap-8"
      >
        <main class="mx-auto flex h-full max-w-screen-lg grow flex-col p-4">
          {#if data?.lastModified || data?.description}
            <section class="mb-6">
              {#if data?.lastModified}
                <small class="mb-1">{formatDate(new Date(data.lastModified))}</small>
              {/if}
              {#if data?.description}
                <p class="m-0">{data.description}</p>
              {/if}
            </section>
          {/if}
          {#if data?.component}
            <section id="pageContainer">
              <svelte:component this={data.component} />
            </section>
          {/if}

          <Pagination slug={data.slug} />
        </main>
        <!-- Toc -->
        {#if headings.length > 0}
          <!-- Toggle toc on mobile -->
          <Button
            name="openToc"
            onclick={() => (mobileTocVisible = !mobileTocVisible)}
            type={['square', 'ghost']}
            class="fixed right-4 top-[4.5rem] z-40 flex items-center justify-center p-3 lg:hidden"
          >
            <Icon icon="line-md:menu-unfold-right" class="size-5" />
          </Button>

          <!-- Toc -->
          <div
            class="fixed top-16 overflow-auto text-nowrap transition-transform max-lg:inset-0 max-lg:z-30 max-lg:flex max-lg:flex-col max-lg:bg-body max-lg:pl-4 max-lg:pt-4 max-lg:dark:bg-body-dark lg:sticky lg:top-24 lg:h-fit lg:w-[250px] lg:shrink-0 lg:px-2 lg:py-4 {mobileTocVisible
              ? 'max-lg:translate-x-0'
              : 'max-lg:-translate-x-full'}"
            id="toc-container"
          >
            <Toc {headings} root={true} />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/key}

<style>
  :global(#pageContainer > h1:first-child) {
    margin-top: 0;
  }
</style>
