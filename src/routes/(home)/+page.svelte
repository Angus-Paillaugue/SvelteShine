<script>
  import { Button } from '$lib/components';
  import { project } from '$conf';

  const { data } = $props()
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />
</svelte:head>

<div class="flex flex-col items-center p-6">
  <h1>Welcome</h1>

  <Button href="/docs/{docsHomePage.name}" class="w-fit">Get started</Button>
</div>
