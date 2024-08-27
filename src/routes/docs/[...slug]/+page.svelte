<script>
  import Navbar from '$lib/components/core/Navbar.svelte';
  import Pagination from './Pagination.svelte';
  import Toc from './Toc.svelte';
  import { project } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';

  const { data } = $props();
  let headings = $state([]);
  afterNavigate(load);

  onMount(load);

  /**
   * On window load event handler.
   */
  function load() {
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
    href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
    integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
    crossorigin="anonymous"
  />
</svelte:head>

<div class="flex grow flex-col">
  <Navbar title={data?.name ?? 'Docs'} />

  <div class="flex h-full flex-col-reverse justify-center max-lg:items-center lg:flex-row lg:gap-8">
    <main class="mx-auto flex h-full w-full grow flex-col p-4">
      {#if data?.component}
        <section id="pageContainer">
          <svelte:component this={data.component} />
        </section>
      {/if}

      <Pagination slug={data.slug} />
    </main>

    <Toc bind:headings root={true} />
  </div>
</div>

<style>
  :global(#pageContainer > h1:first-child) {
    margin-top: 0;
  }
</style>
