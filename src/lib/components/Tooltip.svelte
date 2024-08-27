<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import { cn } from '$lib/utils';

  const { children, title, position = 'top', class: className, ...restProps } = $props();

  let isHovered = $state(false);
  let tooltipCoords = $state({ x: 0, y: 0, width: 0 });
  let tooltip = $state();
  let tooltipContent = $state();

  /**
   * Show the tooltip.
   */
  const showTooltip = () => {
    const rect = tooltip.getBoundingClientRect();
    tooltipCoords = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    };
    isHovered = true;
  };

  /**
   * Hides the tooltip.
   */
  const hideTooltip = () => {
    isHovered = false;
  };

  onMount(() => {
    tooltip.addEventListener('mouseenter', showTooltip);
    tooltip.addEventListener('mouseleave', hideTooltip);
    tooltip.addEventListener('focus', showTooltip);
    tooltip.addEventListener('blur', hideTooltip);

    return () => {
      tooltip.removeEventListener('mouseenter', showTooltip);
      tooltip.removeEventListener('mouseleave', hideTooltip);
      tooltip.removeEventListener('focus', showTooltip);
      tooltip.removeEventListener('blur', hideTooltip);
    };
  });

  /**
   * Retrieves the styles for the Tooltip component.
   *
   * @returns {Object} The styles object.
   */
  const getStyles = () => {
    if (position === 'top') {
      return `top: ${tooltipCoords.y}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === 'bottom') {
      return `top: ${tooltipCoords.y + tooltipCoords.height}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === 'left') {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x}px;`;
    } else if (position === 'right') {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x + tooltipCoords.width}px;`;
    }
  };
  const positionClasses = {
    top: '-translate-y-full -translate-x-1/2',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2'
  };
  // Positioning of the tooltip arrow
  const arrowPositionClasses = {
    top: 'left-1/2 bottom-2 -translate-x-1/2 translate-y-full',
    bottom: 'left-1/2 top-2 -translate-x-1/2 -translate-y-full rotate-180',
    left: 'right-2 translate-x-full top-1/2 -translate-y-1/2 -rotate-90',
    right: 'left-2 -translate-x-full top-1/2 -translate-y-1/2 rotate-90'
  };

  // Animation of the tooltip
  const flyOptions = {
    y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
    x: position === 'left' ? 10 : position === 'right' ? -10 : 0,
    duration: 200,
    easing: backOut
  };
</script>

<button
  tabindex="0"
  name="Open tooltip"
  aria-label="Open tooltip"
  class={cn(
    'inline-block cursor-pointer font-semibold underline decoration-primary-600/50 decoration-dashed underline-offset-2 dark:decoration-primary-600/70',
    className
  )}
  {...restProps}
  bind:this={tooltip}
>
  {title}
</button>

{#if isHovered}
  <div
    class={cn(
      'absolute z-40 flex max-w-[200px] flex-col items-center p-2',
      positionClasses[position]
    )}
    style={getStyles()}
    transition:fly={flyOptions}
    role="tooltip"
    bind:this={tooltipContent}
    onmouseenter={showTooltip}
    onmouseleave={hideTooltip}
  >
    <div
      class="relative rounded bg-neutral-200 p-2 text-sm text-text-body dark:bg-neutral-950 dark:text-text-body-dark"
    >
      {@render children()}
      <!-- Tooltip arrow -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={cn(
          'absolute size-5 text-neutral-200 dark:text-neutral-950',
          arrowPositionClasses[position]
        )}
        viewBox="0 0 40 40"
      >
        <path fill="currentColor" d="M4.659 11.833h30.682L20 32.167z" />
      </svg>
    </div>
  </div>
{/if}
