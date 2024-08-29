<script>
  import { Button } from '$lib/components';
  import { project } from '$conf';

  const { data } = $props();
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta property="og:title" content={project.name} />
  <meta property="twitter:title" content={project.name} />
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />
</svelte:head>

<div class="flex h-screen w-full flex-col items-center justify-center">
  <h1>Welcome</h1>

  <Button href="/docs/{docsHomePage.name}">Get started</Button>
</div>
