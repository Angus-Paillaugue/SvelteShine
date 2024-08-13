<script>
  import { siteName, siteDescription, pages } from '$conf';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { backOut } from 'svelte/easing';

  const { data } = $props();
  const { markdownPreview } = data;
  let getStartedButtonNavShown = $state(false);
  const docsHomePage = getDocsHomePage();

  onMount(() => {
    addCopyCodeButtonFunctionality();

    // Run on page scroll and load
    window.onscroll = onScroll;
    onScroll();
  });

  function onScroll() {
    const screenHeight = window.screen.availHeight;
    if (window.scrollY + screenHeight / 2 > screenHeight) {
      getStartedButtonNavShown = true;
    } else {
      getStartedButtonNavShown = false;
    }
  }

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
  <title>{siteName}</title>
  <meta name="description" content={siteDescription} />
  <meta property="og:description" content={siteDescription} />
  <meta property="twitter:description" content={siteDescription} />

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

<div
  class="fixed top-5 left-1/2 -translate-x-1/2 flex h-16 md:w-[584px] w-[calc(100vw-40px)] rounded-full dark:bg-neutral-600/50 bg-neutral-50/75 border border-neutral-200/50 dark:border-neutral-600 backdrop-blur-md z-30 gap-x-6 p-4"
>
  <div class="relative w-full h-full">
    <div
      class="w-fit absolute duration-500 transition-all top-1/2 -translate-y-1/2 ease-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="text-2xl m-0 w-fit font-bold text-center bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-transparent inline-block"
        style="animation: text 5s ease infinite;"
      >
        {siteName}
      </h1>
    </div>

    {#if getStartedButtonNavShown}
      <span
        transition:fly={{ y: '-100%', duration: 500, easing: backOut }}
        class="absolute top-1/2 right-0 -translate-y-1/2"
      >
        <Button href="/docs/{docsHomePage.name}" class="rounded-full py-1.5">Get started</Button>
      </span>
    {/if}
  </div>
</div>

<div class="isolate w-full flex flex-col dark:bg-white bg-neutral-900">
  <main class="rounded-b-[32px] overflow-clip dark:bg-neutral-900 bg-white">
    <!-- Main page -->
    <Hero {...data} {docsHomePage} />

    <!-- Bento grid -->
    <section class="pt-[56px] pb-[100px] px-2 md:px-12">
      <h1 class="mt-0 mb-6 text-center text-4xl md:text-6xl font-bold">Engage with users</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
        <!-- Markdown block -->
        <div class="h-full flex flex-col items-center">
          <div
            class="relative mx-auto rounded-3xl w-full p-4 border border-neutral-300/50 dark:border-neutral-700/50 overflow-hidden grow"
          >
            <svelte:component this={markdownPreview.SvelteComponents} />
          </div>
          <div class="text-center max-w-md mx-auto space-y-4 mt-8">
            <h1 class="text-xl font-semibold text-black dark:text-white m-0">Svelte components</h1>
            <p class="text-neutral-500 m-0">
              You can include your own or our pre-made svelte components in your documentation.
            </p>
          </div>
        </div>

        <div class="h-full flex flex-col items-center">
          <div
            class="relative mx-auto rounded-3xl w-full p-4 border border-neutral-300/50 dark:border-neutral-700/50 overflow-hidden grow"
          >
            <svelte:component this={markdownPreview.CodeBlock} />
          </div>
          <div class="text-center max-w-md mx-auto space-y-4 mt-8">
            <h1 class="text-xl font-semibold text-black dark:text-white m-0">Code blocks</h1>
            <p class="text-neutral-500 m-0">
              When adding code blocks to your documentation, everything the users need is already
              included
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
