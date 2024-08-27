<script>
  import { cn } from '$lib/utils';
  const { children, class: className, href, type = 'normal', name, ...restProps } = $props();

  const baseClasses = 'px-4 py-2 text-lg block rounded active:scale-90 transition-all font-medium cursor-pointer';

  const typeClasses = {
    normal:
      'text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 rounded-full hocus:bg-primary-400 dark:hocus:bg-primary-500',
    square:
      'p-2 text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 hocus:bg-primary-400 dark:hocus:bg-primary-500',
    circle:
      'p-2 rounded-full text-primary-950 bg-primary-300 dark:bg-primary-400 dark:text-primary-950 hocus:bg-primary-400 dark:hocus:bg-primary-500',
    ghost:
      'bg-body dark:bg-body-dark hocus:bg-neutral-200/50 dark:hocus:bg-neutral-700/50 text-text-heading dark:text-text-heading-dark border border-main dark:border-main-dark',
    noStyle: ''
  };

  const isStyled = !type.split(' ').includes('noStyle');

  const buttonClasses = cn(
    isStyled && baseClasses,
    type
      .split(' ')
      .map((t) => typeClasses[t]?.trim())
      .join(' '),
    className
  );
</script>

{#if href}
  <a {href} class={buttonClasses} aria-label={name} {name} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={buttonClasses} aria-label={name} {name} {...restProps}>
    {@render children()}
  </button>
{/if}
