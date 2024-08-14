<script>
  import Toc from './Toc.svelte';
  import Icon from '@iconify/svelte';

  const { headings = [], root = false } = $props();
</script>

{#if headings.length > 0}
  <div class="">
    {#if root}
      <h6 class="flex flex-row items-center gap-1 text-base font-medium">
        <Icon icon="line-md:menu-unfold-right" class="size-4" />On this page
      </h6>
    {/if}

    <ol class={!root && 'ml-1.5 border-l-2 border-neutral-300/50 pl-2.5 dark:border-neutral-700/50'}>
      {#each headings as heading}
        <li class="mb-2 list-none first:mt-2">
          <a
            href={'#' + heading.id}
            class="mt-1 w-fit max-w-[50px] truncate transition-colors hover:text-primary-500 dark:hover:text-primary-600 {!root &&
              'px-1'}"
          >
            {heading.text}
          </a>
          {#if heading.children.length > 0}
            <Toc headings={heading.children} />
          {/if}
        </li>
      {/each}
    </ol>
  </div>
{/if}
