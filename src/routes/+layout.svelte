<script>
  // Import stylesheets
  import '../code.css';
  import '../app.css';
  import 'lenis/dist/lenis.css';
  import Toasts from '$lib/components/core/Toasts.svelte';
  import { ModeWatcher, mode } from 'mode-watcher';
  import { page } from '$app/stores';
  import { project } from '$conf';
  import PageLoader from '$lib/components/core/PageLoader.svelte';
  import Lenis from 'lenis';
  import { onMount } from 'svelte';

  onMount(() => {
    const lenis = new Lenis({
      prevent: (node) => node.classList.contains('lenis-prevent')
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  const { children } = $props();

  // Watch for mode changes
  $effect(() => {
    // Set mode class
    $mode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    // Set favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.sizes = '32x32';
      document.head.appendChild(link);
    }
    link.href = `/favicon/${$mode}/favicon-32x32.png`;

    // Set apple touch icon
    let appleTouchIcon = document.querySelector("link[rel~='apple-touch-icon']");
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.sizes = '180x180';
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = `/favicon/${$mode}/apple-touch-icon.png`;
  });
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href.split('#')[0]} />
  <meta property="twitter:domain" content={$page.url.hostname} />
  <meta property="twitter:url" content={$page.url.href.split('#')[0]} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href.split('#')[0]} />
  <!-- <meta property="og:locale" content={$locale} /> -->
  <meta property="og:site_name" content={project.name} />

  <meta name="robots" content="all" />
  <meta name="googlebot" content="all" />
  <meta name="googlebot-news" content="all" />
  <meta name="keywords" content={project.keywords} />
  <meta name="author" content={project.author} />
  <meta name="publisher" content={project.author} />
  <meta name="audience" content="all" />
  <meta name="distribution" content="global" />
  <meta name="copyright" content="Copyright {new Date().getFullYear()}" />
  <meta name="Designer" content="Angus Paillaugue" />
</svelte:head>

<Toasts />
<ModeWatcher defaultMode={'dark'} />
<PageLoader />

{@render children()}
