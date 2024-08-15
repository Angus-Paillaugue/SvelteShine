<script>
  import { cn } from '$lib/utils';
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
      'bg-body dark:bg-body-dark hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-text-heading dark:text-text-heading-dark border border-main dark:border-main-dark'
  };

  const buttonClasses = cn(
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
