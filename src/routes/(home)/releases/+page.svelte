<script>
  import releases from './releases.json';
  import Icon from '@iconify/svelte';
  import { formatDate } from '$lib/utils';
</script>

<div class="max-w-screen-md mx-auto p-4 mt-6 flex flex-col gap-8">
  {#each releases.reverse() as release}
    <a href="https://github.com/Angus-Paillaugue/SvelteShine/releases/tag/{release.version}" aria-label="Go to version {release.version}" target="_blank" class="border border-main dark:border-main-dark rounded relative group">
      <div class="p-6">
        <h1 class="m-0 leading-8">{release.version}</h1>
        <small>{formatDate(new Date(release.date))}</small>
      </div>
      <div class="p-6 pt-0">
        <p class="m-0 mt-4">{release.description}</p>
      </div>
      <span class="absolute top-2 right-2 transition-all opacity-0 group-hover:opacity-100 -rotate-[45deg] -translate-x-1/2 translate-y-1/2 group-hover:translate-x-0 group-hover:translate-y-0">
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="size-8" />
      </span>
    </a>
  {/each}
  {#if releases.length === 0}
    <h1 class="text-center m-0 leading-10">No releases yet</h1>
  {/if}
</div>
