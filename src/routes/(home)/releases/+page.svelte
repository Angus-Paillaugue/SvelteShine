<script>
  import releases from './releases.json';
  import Icon from '@iconify/svelte';
  import { formatDate } from '$lib/utils';
  import { project } from '$conf';
</script>

<svelte:head>
  <title>Releases</title>
  <meta property="og:title" content='Releases' />
  <meta property="twitter:title" content='Releases' />

  <meta name="description" content='{project.name} releases' />
  <meta
    property="og:description"
    content='{project.name} releases'
  />
  <meta
    property="twitter:description"
    content='{project.name} releases'
  />
</svelte:head>

<div class="mx-auto mt-6 flex max-w-screen-md flex-col gap-8 p-4">
  {#each releases.reverse() as release}
    <a
      href="https://github.com/Angus-Paillaugue/SvelteShine/releases/tag/{release.version}"
      aria-label="Go to version {release.version}"
      target="_blank"
      class="group relative rounded border border-main dark:border-main-dark"
    >
      <div class="p-6">
        <h1 class="m-0 leading-8">{release.version}</h1>
        <small>{formatDate(new Date(release.date))}</small>
      </div>
      <div class="p-6 pt-0">
        <p class="m-0 mt-4">{release.description}</p>
      </div>
      <span
        class="absolute right-2 top-2 -translate-x-1/2 translate-y-1/2 -rotate-[45deg] opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Icon
          icon="material-symbols:arrow-forward-ios-rounded"
          class="size-8"
        />
      </span>
    </a>
  {/each}
  {#if releases.length === 0}
    <h1 class="m-0 text-center leading-10">No releases yet</h1>
  {/if}
</div>
