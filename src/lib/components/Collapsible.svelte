<script>
  import { twMerge } from 'tailwind-merge';
  import Icon from "@iconify/svelte";
  import { accordion } from '$lib/utils';

  let { class: cLasslist, summary, children, icon, open = $bindable(false), ...restProps } = $props();
</script>


<div class={twMerge('border border-neutral-300/50 dark:border-neutral-700/50 rounded-md bg-white dark:bg-neutral-950 overflow-hidden transition-colors w-full mb-6', cLasslist)}>
  <button onclick={() => (open = !open)} {restProps} class='cursor-pointer flex flex-row items-center items-between text-base font-semibold p-2 hover:bg-neutral-200/50 hover:dark:bg-inherit transition-colors w-full'>
    <span class="arrow transition-all">
      <Icon
        icon="material-symbols:arrow-right-rounded"
        class="size-7 transition-transform {open && "rotate-90"}"
      />
    </span>
    {#if icon}
      <Icon
        {icon}
        class="size-6 mr-2"
      />
    {/if}
    {@html summary}
  </button>
  <div use:accordion={open}>
    <div class="p-4">
      {@render children()}
    </div>
  </div>
</div>
