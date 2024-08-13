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
    const triggerHeight = window.scrollY + (screenHeight / 3) * 2;
    // Show get started button in the nav when the user scrolls past 1/3 of the screen height
    getStartedButtonNavShown = triggerHeight > screenHeight;
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

<!-- Navbar -->
<nav
  class="fixed top-5 left-1/2 -translate-x-1/2 flex h-16 md:w-[584px] w-[calc(100vw-40px)] rounded-full dark:bg-neutral-600/50 bg-neutral-50/75 border border-neutral-200/50 dark:border-neutral-600 backdrop-blur-md z-30 gap-x-6 p-4"
>
  <div class="relative w-full h-full">
    <div
      class="w-fit absolute duration-500 transition-all top-1/2 -translate-y-1/2 ease-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="text-2xl m-0 w-fit font-bold text-center bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 dark:from-primary-500 dark:via-neutral-200 dark:to-primary-500 bg-clip-text text-transparent dark:text-transparent inline-block"
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
</nav>

<div class="isolate w-full flex flex-col dark:bg-white bg-neutral-900">
  <main class="rounded-b-[32px] overflow-clip dark:bg-neutral-900 bg-white">
    <!-- Main page -->
    <Hero {...data} {docsHomePage} />

    <!-- Bento grid -->
    <!-- <section class="pt-[56px] pb-[100px] px-2 md:px-12">
      <h1 class="mt-0 mb-6 text-center text-4xl md:text-6xl font-bold">Engage with users</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
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
    </section> -->

    <!-- Bento grid -->
    <section class="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-2 px-2 md:px-10 md:my-24">
      <div
        class="border border-neutral-300/50 dark:border-neutral-700/50 p-4 xl:p-8 text-center flex flex-col items-center gap-2 col-span-1 md:col-span-3 rounded-md relative overflow-hidden md:rounded-tl-[50px] max-md:rounded-t-[50px]"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fgorgeous.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div class="absolute left-0 right-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-b from-transparent dark:to-neutral-900 to-white to-40%"></div>
        <div class="absolute bottom-0 left-0 right-0 flex text-center justify-center flex-col gap-2 p-4 xl:p-8">
          <h1 class="text-base font-medium m-0">Gorgeous out of the box</h1>
          <span>Opinionated when you're lazy, but infinitely flexible when you need it to be</span>
        </div>
      </div>
      <div
        class="border border-neutral-300/50 dark:border-neutral-700/50 p-4 xl:p-8 text-center flex flex-col items-center gap-2 col-span-1 md:col-span-3 rounded-md relative overflow-hidden md:rounded-tr-[50px]"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fdeveloper.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div class="absolute left-0 right-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-b from-transparent dark:to-neutral-900 col-span-1 md:col-span-2 to-white to-40%"></div>
        <div class="absolute bottom-0 left-0 right-0 flex text-center justify-center flex-col gap-2 p-4 xl:p-8">
          <h1 class="text-base font-medium m-0">Developer forward</h1>
          <span>Content is powered by markdown and lives alongside your codebase</span>
        </div>
      </div>
      <div
        class="border border-neutral-300/50 dark:border-neutral-700/50 p-4 xl:p-8 text-center flex flex-col items-center gap-2 col-span-1 md:col-span-2 rounded-md relative overflow-hidden md:rounded-bl-[50px]"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fperformance.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div class="absolute left-0 right-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-b from-transparent dark:to-neutral-900 to-white to-40%"></div>
        <div class="absolute bottom-0 left-0 right-0 flex text-center justify-center flex-col gap-2 p-4 xl:p-8">
          <h1 class="text-base font-medium m-0">Built for performance</h1>
          <span>Meticulously designed and optimized for a great user experience</span>
        </div>
      </div>
      <div
        class="border border-neutral-300/50 dark:border-neutral-700/50 p-4 xl:p-8 text-center flex flex-col items-center gap-2 col-span-1 md:col-span-2 rounded-md relative overflow-hidden"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fconversion.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div class="absolute left-0 right-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-b from-transparent dark:to-neutral-900 to-white to-40%"></div>
        <div class="absolute bottom-0 left-0 right-0 flex text-center justify-center flex-col gap-2 p-4 xl:p-8">
          <h1 class="text-base font-medium m-0">Conversion as a priority</h1>
          <span>Crafted for more user engagement and conversions</span>
        </div>
      </div>
      <div
        class="border border-neutral-300/50 dark:border-neutral-700/50 p-4 xl:p-8 text-center flex flex-col items-center gap-2 col-span-1 md:col-span-2 rounded-md relative overflow-hidden md:rounded-br-[50px] max-md:rounded-b-[50px]"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fmaintained.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div class="absolute left-0 right-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-b from-transparent dark:to-neutral-900 to-white to-40%"></div>
        <div class="absolute bottom-0 left-0 right-0 flex text-center justify-center flex-col gap-2 p-4 xl:p-8">
          <h1 class="text-base font-medium m-0">Effortlessly maintained</h1>
          <span>Designed to make updating documentation easy</span>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
