<script>
  import { Button } from '$lib/components';
  import { project } from '$conf';

  const { data } = $props();
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />
</svelte:head>

<div class="flex h-screen w-screen flex-col items-center justify-center">
  <h1>Welcome to SvelteShine</h1>
  <Button href="/docs/{docsHomePage.name}">Get started</Button>
</div>
