<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} Error</title>
</svelte:head>

<section class="flex h-screen flex-col items-center justify-center gap-4">
	<span class="font-extrabold text-8xl">{$page.status}</span>
	<span class="text-lg">{$page.error.message}</span>
	<a class="rounded-md bg-primary-300 dark:bg-primary-700 p-2 transition-all active:scale-90 text-lg font-bold" href="/">Go back</a>
</section>
