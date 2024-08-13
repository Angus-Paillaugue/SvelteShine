<script>
  import { siteName, homepage } from '$conf';
  import Icon from '@iconify/svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components';
  import { mode } from "mode-watcher"
  const { docsHomePage } = $props();

  onMount(addCopyCodeButtonFunctionality);
</script>

<svelte:head>
  <style>
    @keyframes starlight-right {
      0% {
        transform: translate(-100%);
      }
      50%,
      100% {
        transform: translate(100%);
      }
    }
    @keyframes float {
      0% {
        transform: translateY(10px);
      }
      50% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(10px);
      }
    }
  </style>
</svelte:head>

<section class="relative isolate transform-gpu h-screen flex flex-col md:pt-52 md:pb-10" id="home">
  <!-- Grid -->
  <svg
    class="absolute inset-0 -z-10 h-full w-full dark:stroke-white/5 stroke-black/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
    aria-hidden="true"
    ><defs
      ><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"
        ><path d="M.5 200V.5H200" fill="none"></path></pattern
      ></defs
    ><rect width="100%" height="100%" stroke-width="0" fill="url(#hero)"></rect></svg
  >

  <!-- Main content -->
  <div
    class="flex flex-col justify-center max-w-screen-2xl grow h-full w-full mx-auto items-center gap-20 relative px-2 md:px-10"
  >
    <!-- Left content part -->
    <div class="max-lg:p-2 max-sm:row-span-1 max-md:row-span-2 max-sm:self-center max-md:self-end shrink-0">
      <!-- New version badge -->
      {#if homepage.version.showHomepageMessage}
        <a
          class="border-neutral-300/50 dark:border-neutral-700/50 group mb-5 flex w-max items-center gap-x-2 rounded-full border text-sm py-1 px-2 transition-colors hover:bg-neutral-600/10 focus-visible:bg-neutral-600/20 relative"
          href={homepage.version.latestVersionURL}
          ><span
            class="-ml-1 flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium text-neutral-100 bg-neutral-950"
            >NEW</span
          >{siteName} launches v{homepage.version.latestVersion}

          <Icon icon="line-md:arrow-right" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1" />

          <div
            class="absolute -bottom-px right-2 left-2 h-px [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)]"
            aria-hidden="true"
          >
            <div
              class="h-2 w-full bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0"
              style="animation: starlight-right 3s ease-in-out infinite;"
            ></div>
          </div>
        </a>
      {/if}

      <!-- Title -->
      <h1
        class="leading-[100%] text-[45px] md:text-[75px] lg:text-[80px]"
      >
        <span
          class="dark:text-neutral-50 text-neutral-50 text-shadow-[0_4px_0_#141414] dark:text-shadow-[0_4px_0_#ffffff]"
          style="-webkit-text-fill-color: #fff;-webkit-text-stroke-width: 2px;-webkit-text-stroke-color: #000;"
          >{siteName}</span
        >, {homepage.catchphrase}
      </h1>

      <!-- CTA buttons -->
      <div
        class="flex flex-row w-full justify-start items-center gap-8 mt-8"
      >
        <Button href="/docs/{docsHomePage.name}">Get started</Button>

        <Button type="ghost" class="flex flex-row gap-4 rounded-full items-center">
          Learn more
          <Icon
            icon="line-md:arrow-right"
            class="size-6 p-1 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 dark:text-neutral-100 text-neutral-950"
          />
        </Button>
      </div>
    </div>

    <!-- Gradient behind mockup -->
    <div class="absolute inset-0 -z-10 sm:bg-radient-[45%_20%_at_50%_60%] md:bg-radient-[45%_25%_at_50%_75%] lg:bg-radient-[45%_30%_at_50%_70%] xl:bg-radient-[40%_35%_at_50%_60%] from-primary-600/50 dark:from-primary-600/30" style="animation: float 5s ease-in-out infinite;"></div>

    <!-- Mockup -->
    {#if $mode}
      <div class="max-sm:hidden max-md:self-start border rounded-xl overflow-hidden border-neutral-300/50 dark:border-neutral-700/50" style="animation: float 5s ease-in-out infinite;">
        <picture>
          <source media="(max-width: 480px)" srcset="/homepage/mockup/{$mode}/homepagePreview_480.webp">
          <source media="(max-width: 960px)" srcset="/homepage/mockup/{$mode}/homepagePreview_960.webp">
          <img src="/homepage/mockup/{$mode}/homepagePreview_1920.webp" alt="website mockup" class="object-contain" />
        </picture>
      </div>
    {/if}
  </div>

  <!-- Bottom gradient to hide the bottom of the mockup -->
  <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-b from-transparent to-white dark:to-neutral-900 to-40% md:to-80% lg:h-[500px] h-[600px] md:h-[400px] max-sm:hidden"></div>
</section>
