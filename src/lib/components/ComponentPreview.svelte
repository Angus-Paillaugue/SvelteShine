<script>
  import { cn } from '$lib/utils';

  const { children, title, class: className, ...restProps } = $props();
</script>

<div class={cn('relative', className)} {...restProps}>
  {#if title}
    <h3 class="m-0 mb-2">{title}</h3>
  {/if}
  <div
    class="component-preview lenis-prevent relative flex h-[20rem] items-center overflow-auto rounded-xl bg-primary-400 before:absolute before:inset-0 before:opacity-100 before:transition-opacity before:content-[''] before:hover:opacity-0 lg:h-[28rem]"
  >
    <div class="z-10 mx-auto inline-block p-4">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .component-preview::before {
    background-image: radial-gradient(
      circle at 1px 1px,
      theme('colors.primary.800/0.35') 1px,
      transparent 0
    );
    background-size: 1rem 1rem;
    background-repeat: repeat;
    background-position: 0.5rem center;
  }

  :global(.component-preview > div > *:last-child) {
    margin-bottom: 0;
  }
</style>
