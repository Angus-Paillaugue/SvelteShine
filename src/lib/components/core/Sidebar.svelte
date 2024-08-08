<script>
  import { getTree } from '$lib/pages';
  import PageList from './PageList.svelte';

  const pages = getTree();
</script>

<aside
  class="h-screen p-2 flex flex-col gap-0 w-[300px] pl-0 sticky top-0 border-r border-neutral-300 dark:border-neutral-800 shrink-0"
>
  <PageList {pages} root={true} />
</aside>
