<script>
	import { allPages } from '$lib/pages';
	import PageList from './PageList.svelte';

	const pages = allPages();
</script>

<aside class="h-screen p-2 flex flex-col gap-0 w-[300px] pl-0 sticky top-0 border-r border-primary-300 dark:border-primary-700">
	<PageList {pages} root={true} />
</aside>
