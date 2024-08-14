<script>
  import { siteName, siteDescription, pages } from '$conf';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { backOut } from 'svelte/easing';

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
  class="fixed left-1/2 top-5 z-30 flex h-16 w-[calc(100vw-40px)] -translate-x-1/2 gap-x-6 rounded-full border border-neutral-200/50 bg-neutral-50/75 p-4 backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-600/50 md:w-[584px]"
>
  <div class="relative h-full w-full">
    <div
      class="absolute top-1/2 w-fit -translate-y-1/2 transition-all duration-500 ease-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="m-0 inline-block w-fit bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-primary-500 dark:via-neutral-200 dark:to-primary-500 dark:text-transparent"
        style="animation: text 5s ease infinite;"
      >
        {siteName}
      </h1>
    </div>

    {#if getStartedButtonNavShown}
      <span
        transition:fly={{ y: '-100%', duration: 500, easing: backOut }}
        class="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Button href="/docs/{docsHomePage.name}" class="rounded-full py-1.5">Get started</Button>
      </span>
    {/if}
  </div>
</nav>

<div class="isolate flex w-full flex-col bg-neutral-900 dark:bg-white">
  <main class="overflow-clip rounded-b-[32px] bg-white dark:bg-neutral-900">
    <!-- Main page -->
    <Hero {docsHomePage} />

    <!-- Bento grid -->
    <section
      class="mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 px-2 md:my-24 md:grid-cols-6 md:px-10"
    >
      <div
        class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded-md border border-neutral-300/50 p-4 text-center dark:border-neutral-700/50 max-md:rounded-t-[50px] md:col-span-3 md:rounded-tl-[50px] xl:p-8"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fgorgeous.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Gorgeous out of the box</h1>
          <span>Opinionated when you're lazy, but infinitely flexible when you need it to be</span>
        </div>
      </div>
      <div
        class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded-md border border-neutral-300/50 p-4 text-center dark:border-neutral-700/50 md:col-span-3 md:rounded-tr-[50px] xl:p-8"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fdeveloper.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 col-span-1 h-2/3 bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900 md:col-span-2"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Developer forward</h1>
          <span>Content is powered by markdown and lives alongside your codebase</span>
        </div>
      </div>
      <div
        class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded-md border border-neutral-300/50 p-4 text-center dark:border-neutral-700/50 md:col-span-2 md:rounded-bl-[50px] xl:p-8"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fperformance.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Built for performance</h1>
          <span>Meticulously designed and optimized for a great user experience</span>
        </div>
      </div>
      <div
        class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded-md border border-neutral-300/50 p-4 text-center dark:border-neutral-700/50 md:col-span-2 xl:p-8"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fconversion.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Conversion as a priority</h1>
          <span>Crafted for more user engagement and conversions</span>
        </div>
      </div>
      <div
        class="relative col-span-1 flex flex-col items-center gap-2 overflow-hidden rounded-md border border-neutral-300/50 p-4 text-center dark:border-neutral-700/50 max-md:rounded-b-[50px] md:col-span-2 md:rounded-br-[50px] xl:p-8"
      >
        <img
          src="https://mintlify.com/_next/image?url=%2Fassets%2Fvalues%2Fdark%2Fmaintained.png&w=640&q=75"
          class="w-[80%] object-contain"
          alt=""
        />
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900"
        ></div>
        <div
          class="absolute bottom-0 left-0 right-0 flex flex-col justify-center gap-2 p-4 text-center xl:p-8"
        >
          <h1 class="m-0 text-base font-medium">Effortlessly maintained</h1>
          <span>Designed to make updating documentation easy</span>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
