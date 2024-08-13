<script>
  import { siteName, homepage } from '$conf';
  import { reveal } from 'svelte-reveal';
  import Icon from '@iconify/svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components';

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
  </style>
</svelte:head>

<section class="relative isolate transform-gpu min-h-screen flex flex-col py-[56px]" id="home">
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
  <!-- Gradient -->
  <div
    class="absolute inset-0 -z-10 bg-radient-[80%_50%_at_50%_-20%] from-primary-600/50 dark:from-primary-600/30 to-transparent b"
  ></div>

  <!-- Main content -->
  <div
    class="lg:grid lg:grid-cols-5 max-lg:justify-center flex flex-col max-w-screen-2xl grow h-full w-full mx-auto lg:items-center gap-10 relative px-2 md:px-10"
  >
    <!-- Left content part -->
    <div class="max-lg:p-2 lg:col-span-3">
      {#if homepage.version.showHomepageMessage}
        <a
          class="border-neutral-300/50 dark:border-neutral-700/50 group mb-5 flex w-max items-center gap-x-2 rounded-full border text-sm py-1 px-2 transition-colors hover:bg-neutral-600/10 focus-visible:bg-neutral-600/20 relative"
          href={homepage.version.latestVersionURL}
          use:reveal={{ transition: 'fly', delay: 100, duration: 400, y: -10 }}
          ><span
            class="-ml-1 flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium text-neutral-100 bg-neutral-950"
            >NEW</span
          >{siteName} launches v{homepage.version.latestVersion}

          <Icon
            icon="material-symbols-light:arrow-forward-ios-rounded"
            class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1"
          />

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
      <h1
        class="leading-[100%] text-[45px] md:text-[75px] lg:text-[80px]"
        use:reveal={{ transition: 'fly', duration: 200, y: -10 }}
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
        use:reveal={{ transition: 'fly', delay: 300, duration: 400, y: -10 }}
      >
        <Button href="/docs/{docsHomePage.name}">Get started</Button>

        <Button type="ghost" class="flex flex-row gap-4 rounded-full items-center">
          Learn more
          <Icon
            icon="material-symbols-light:arrow-right-alt-rounded"
            class="size-6 rounded-full bg-neutral-200/50 dark:bg-neutral-700/50 dark:text-neutral-100 text-neutral-950"
          />
        </Button>
      </div>
    </div>

    <div class="lg:col-span-2"></div>
  </div>
</section>
