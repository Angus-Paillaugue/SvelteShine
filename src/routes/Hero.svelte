<script>
  import { project, homepage } from '$conf';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components';
  import { mode } from 'mode-watcher';

  const { docsHomePage } = $props();
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

<section class="relative isolate flex h-screen transform-gpu flex-col md:pb-10 md:pt-52" id="home">
  <!-- Grid -->
  <svg
    class="absolute inset-0 -z-10 h-full w-full stroke-black/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)] dark:stroke-white/5"
    aria-hidden="true"
    ><defs
      ><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"
        ><path d="M.5 200V.5H200" fill="none"></path></pattern
      ></defs
    ><rect width="100%" height="100%" stroke-width="0" fill="url(#hero)"></rect></svg
  >

  <!-- Main content -->
  <div
    class="relative mx-auto flex h-full w-full max-w-screen-2xl grow flex-col items-center justify-center gap-20 px-2 md:px-10"
  >
    <!-- Left content part -->
    <div
      class="shrink-0 max-lg:p-2 max-md:row-span-2 max-md:self-end max-sm:row-span-1 max-sm:self-center"
    >
      <!-- New version badge -->
      {#if homepage.version.showHomepageMessage}
        <a
          class="group relative mb-5 flex w-max items-center gap-x-2 rounded-full border border-main px-2 py-1 text-sm transition-colors focus-visible:bg-neutral-600/20 hocus:bg-neutral-600/10 dark:border-main-dark"
          href={homepage.version.latestVersionURL}
          ><span
            class="-ml-1 flex items-center gap-2 rounded-full bg-neutral-950 px-2 py-1 text-xs font-medium text-neutral-100"
            >NEW</span
          >{project.name} launches v{homepage.version.latestVersion}

          <Icon
            icon="line-md:arrow-right"
            class="group-hocus:translate-x-1 h-4 w-4 transition-transform duration-500 group-focus-visible:translate-x-1"
          />

          <div
            class="absolute -bottom-px left-2 right-2 h-px [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)]"
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
      <h1 class="text-[45px] leading-[100%] md:text-[75px] lg:text-[80px]">
        <span
          class="text-neutral-50 text-shadow-[0_4px_0_#141414] dark:text-neutral-50 dark:text-shadow-[0_4px_0_#ffffff]"
          style="-webkit-text-fill-color: #fff;-webkit-text-stroke-width: 2px;-webkit-text-stroke-color: #000;"
          >{project.name}</span
        >, {homepage.catchphrase}
      </h1>

      <!-- CTA buttons -->
      <div class="mt-8 flex w-full flex-row items-center justify-start gap-8" id="cta">
        <Button href="/docs/{docsHomePage.name}" name="Go to docs">Get started</Button>

        <Button
          href="#learn-more"
          type="ghost"
          name="Learn more"
          class="flex flex-row items-center gap-4 rounded-full"
        >
          Learn more
          <Icon
            icon="line-md:arrow-right"
            class="size-6 rounded-full bg-neutral-200/50 p-1 text-text-heading dark:bg-neutral-700/50 dark:text-text-heading-dark"
          />
        </Button>
      </div>
    </div>

    <!-- Gradient behind mockup -->
    <div
      class="absolute inset-0 -z-10 from-primary-600/50 dark:from-primary-600/30 sm:bg-radient-[45%_20%_at_50%_60%] md:bg-radient-[45%_25%_at_50%_75%] lg:bg-radient-[45%_30%_at_50%_70%] xl:bg-radient-[40%_35%_at_50%_60%]"
      style="animation: float 5s ease-in-out infinite;"
    ></div>

    <!-- Mockup -->
    {#if $mode}
      <div
        class="overflow-hidden rounded-xl border border-main dark:border-main-dark max-md:self-start max-sm:hidden"
        style="animation: float 5s ease-in-out infinite;"
      >
        <picture>
          <source
            media="(max-width: 960px)"
            srcset="/homepage/mockup/{$mode}/homepagePreview_960.webp"
          />
          <img
            src="/homepage/mockup/{$mode}/homepagePreview_1920.webp"
            alt="website mockup"
            class="object-contain"
          />
        </picture>
      </div>
    {/if}
  </div>

  <!-- Bottom gradient to hide the bottom of the mockup -->
  <div
    class="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[600px] bg-gradient-to-b from-transparent to-white to-40% dark:to-neutral-900 max-sm:hidden md:h-[400px] md:to-80% lg:h-[500px]"
  ></div>
</section>
