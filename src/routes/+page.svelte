<script>
  import { siteDescription } from '$conf';
</script>

<svelte:head>
  <meta name="description" content={siteDescription} />
  <meta property="og:description" content={siteDescription} />
  <meta property="twitter:description" content={siteDescription} />
</svelte:head>

<a href="/docs">Get started</a>
