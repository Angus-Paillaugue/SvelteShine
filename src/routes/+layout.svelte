<script>
  // Import stylesheets
  import '../code.css';
  import '../app.css';
  import Toasts from '$lib/components/core/Toasts.svelte';
  import { ModeWatcher, mode } from 'mode-watcher';
  import { page } from '$app/stores';
  import { project } from '$conf';

  const { children } = $props();

  // Watch for mode changes
  $effect(() => {
    $mode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
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

{@render children()}
