<script>
  import Bento from './Bento.svelte';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { project, pages } from '$conf';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { backOut } from 'svelte/easing';

  const docsHomePage = getDocsHomePage();
  let getStartedButtonNavShown = $state(false);

  onMount(() => {
    // For displaying the cta in the navbar when the user scrolls past the cta section
    const observer = new IntersectionObserver(intersect, { threshold: 0 });
    // Observe the cta section
    const ctaSection = document.getElementById('cta');
    observer.observe(ctaSection);

    /**
     * Function to handle the intersection of the node and update the navbar cta display state based on intersection.
     * @param {IntersectionObserverEntry} entry
     */
    function intersect([entry]) {
      getStartedButtonNavShown = !entry.isIntersecting;
    }

    return () => {
      observer.disconnect();
    };
  });

  /**
   * Function to get the documentation home page.
   *
   * @returns {page}
   */
  function getDocsHomePage() {
    // Get the first page that doesn't have children in the pages lists from the config.
    return pages.filter((page) => !page?.children)[0];
  }
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />

  <style>
    @keyframes text {
      0%,
      100% {
        background-size: 200% 200%;
        background-position: left center;
      }
      50% {
        background-size: 200% 200%;
        background-position: right center;
      }
    }
  </style>
</svelte:head>

<!-- Navbar -->
<nav
  class="fixed left-1/2 top-5 z-30 flex h-16 w-[calc(100vw-40px)] -translate-x-1/2 gap-x-6 rounded-full border border-main bg-neutral-50/75 p-4 backdrop-blur-md dark:border-main-dark dark:bg-neutral-600/50 md:w-[584px]"
>
  <div class="relative h-full w-full">
    <div
      class="absolute top-1/2 w-fit -translate-y-1/2 transition-all duration-500 ease-back-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="m-0 inline-block w-fit bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-primary-500 dark:via-neutral-200 dark:to-primary-500 dark:text-transparent"
        style="animation: text 5s ease infinite;"
      >
        {project.name}
      </h1>
    </div>

    {#if getStartedButtonNavShown}
      <span
        transition:fly={{ y: '-100%', duration: 500, easing: backOut }}
        class="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Button href="/docs/{docsHomePage.name}" name="Go home" class="rounded-full py-1.5"
          >Get started</Button
        >
      </span>
    {/if}
  </div>
</nav>

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <Hero {docsHomePage} />

    <Bento />
  </main>

  <Footer />
</div>
