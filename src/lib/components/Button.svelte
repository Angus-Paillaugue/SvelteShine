<script>
  import { twMerge } from 'tailwind-merge';
  const { children, class: className, href, type = 'normal', ...restProps } = $props();

  const baseClasses =
    'px-4 py-2 text-lg block rounded-md active:scale-90 transition-all font-medium';

  const typeClasses = {
    normal:
      'text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 rounded-full hover:bg-primary-400 dark:hover:bg-primary-500',
    square:
      'p-2 text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 hover:bg-primary-400 dark:hover:bg-primary-500',
    circle:
      'p-2 rounded-full text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 hover:bg-primary-400 dark:hover:bg-primary-500',
    ghost:
      'bg-white dark:bg-neutral-900 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50'
  };

  const buttonClasses = twMerge(
    baseClasses,
    type instanceof Array ? type.map((t) => typeClasses[t]).join(' ') : typeClasses[type],
    className
  );
</script>

{#if href}
  <a {href} class={buttonClasses} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={buttonClasses} {...restProps}>
    {@render children()}
  </button>
{/if}
