<script>
  import { formatDate, addCopyCodeButtonFunctionality } from '$lib/utils';
  import Navbar from '$lib/components/core/Navbar.svelte';
  import { siteDescription } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import Pagination from './Pagination.svelte';
  import Toc from './Toc.svelte';

  const { data } = $props();
  let headings = $state([]);

  afterNavigate(() => {
    addCopyCodeButtonFunctionality();
    const pageContainer = document.querySelector('#pageContainer');

    const headingElements = pageContainer.querySelectorAll(
      'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
    );

    headings = createHeadingTree(headingElements);
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

<div class="flex flex-col w-full min-h-screen">
  {#key data?.name}
    <Navbar title={data?.name ?? 'Docs'} />

    <div class="flex flex-col-reverse lg:flex-row justify-center mx-auto w-full h-full grow">
      <main class="grow p-2 flex flex-col w-full lg:shrink-0 h-full max-w-screen-md">
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
      <div class="lg:ml-4 lg:sticky lg:top-24 lg:h-fit py-4 px-2 lg:w-[200px] text-nowrap">
        <Toc {headings} root={true} />
      </div>
    </div>
  {/key}
</div>

<style>
  :global(#pageContainer > h1:first-child) {
    margin-top: 0;
  }
</style>
