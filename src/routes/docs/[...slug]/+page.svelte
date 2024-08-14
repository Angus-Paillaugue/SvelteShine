<script>
  import { formatDate, addCopyCodeButtonFunctionality } from '$lib/utils';
  import Navbar from '$lib/components/core/Navbar.svelte';
  import Sidebar from '$lib/components/core/Sidebar';
  import { sidebarStyle } from '$conf';
  import { Button } from '$lib/components/';
  import { siteDescription } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import Pagination from './Pagination.svelte';
  import Toc from './Toc.svelte';
  import Icon from "@iconify/svelte"

  const { data } = $props();
  let headings = $state([]);
  let mobileTocVisible = $state(false);
  let sidebarOpen = $state(false)

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

    window.addEventListener("click", (e) => {
      if(e.target.closest("#toc-container")) {
        mobileTocVisible = false;
      }
    })
  });

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

  <meta name="description" content={data?.description ?? siteDescription} />
  <meta property="og:description" content={data?.description ?? siteDescription} />
  <meta property="twitter:description" content={data?.description ?? siteDescription} />
  <!-- Adding katex stylesheet for math support -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
    integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
    crossorigin="anonymous"
  />
</svelte:head>

{#key data?.name}
  <div class="flex min-h-screen w-full flex-row mx-auto max-w-screen-2xl">
    <Sidebar open={sidebarOpen} style={sidebarStyle} />

    <div class="flex-col flex grow">
      <Navbar title={data?.name ?? 'Docs'} />

      <div class="flex h-full flex-col-reverse justify-center max-lg:items-center lg:gap-8 lg:flex-row">
        <main class="flex h-full grow flex-col p-4 max-w-screen-lg mx-auto">
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
          <Button name="openToc" onclick={() => (mobileTocVisible = !mobileTocVisible)} type={["square", "ghost"]} class="flex lg:hidden items-center justify-center fixed top-[4.5rem] right-4 z-40 p-3">
            <Icon icon="line-md:menu-unfold-right" class="size-5" />
          </Button>

          <!-- Toc -->
          <div class="text-nowrap lg:px-2 lg:py-4 lg:sticky top-16 lg:top-24 lg:h-fit lg:w-[250px] overflow-auto fixed max-lg:inset-0 max-lg:bg-white max-lg:dark:bg-neutral-900 max-lg:flex max-lg:flex-col max-lg:pl-4 max-lg:pt-4 transition-transform max-lg:z-30 lg:shrink-0 {mobileTocVisible ? 'max-lg:translate-x-0' : "max-lg:-translate-x-full"}" id="toc-container">
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
