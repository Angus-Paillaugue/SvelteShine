<script>
  import Bento from './Bento.svelte';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { project } from '$conf';

  const { data } = $props()
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />

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

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body -mt-16">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <Hero {docsHomePage} />

    <Bento />
  </main>

  <Footer />
</div>
