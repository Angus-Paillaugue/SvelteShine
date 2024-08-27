<script>
  import TocList from './TocList.svelte';
  import { cn } from '$lib/utils';

  const { headings = $bindable([]), root = false } = $props();
</script>

<ol class={cn(!root && 'ml-2')}>
  {#each headings as heading}
    <li class="mb-2 list-none first:mt-2 last:m-0">
      <a
        href={'#' + heading.id}
        class="mt-1 max-w-[50px] transition-colors hocus:text-primary-500 dark:hocus:text-primary-600 {!root &&
          'px-1'}"
      >
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <TocList headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
