<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { backOut } from 'svelte/easing';
  import { twMerge } from "tailwind-merge";

  const { children, title, position="top" } = $props();

  let isHovered = $state(false);
  let tooltipCoords = $state({ x: 0, y: 0, width: 0 });
  let tooltip = $state();
  let tooltipContent = $state();
  const flyOptions = { y: position === "top" ? 10 : position === 'bottom' ? -10 : 0, x: position === "left" ? 10 : position === 'right' ? -10 : 0, duration: 200, easing: backOut };

  const showTooltip = () => {
    isHovered = true;
    tooltipCoords = tooltip.getBoundingClientRect();
  };

  const hideTooltip = () => {
    isHovered = false;
  };

  onMount(() => {
    tooltip.addEventListener("mouseenter", showTooltip);
    tooltip.addEventListener("mouseleave", hideTooltip);
  });

  const getStyles = () => {
    if (position === "top") {
      return `top: ${tooltipCoords.y}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === "bottom") {
      return `top: ${tooltipCoords.y + tooltipCoords.height}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === "left") {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x}px;`;
    } else if (position === "right") {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x + tooltipCoords.width}px;`;
    }
  };

  const positionClasses = {
    top: "-translate-y-full -translate-x-1/2",
    bottom: "-translate-x-1/2",
    left: "-translate-x-full -translate-y-1/2",
    right: "-translate-y-1/2"
  };
  const arrowPositionClasses = {
    top: "left-1/2 bottom-2 -translate-x-1/2 translate-y-full",
    bottom: "left-1/2 top-2 -translate-x-1/2 -translate-y-full rotate-180",
    left: "right-2 translate-x-full top-1/2 -translate-y-1/2 -rotate-90",
    right: "left-2 -translate-x-full top-1/2 -translate-y-1/2 rotate-90"
  };
</script>

<span class="inline-block cursor-pointer underline underline-offset-2 decoration-dashed decoration-primary-600/50 dark:decoration-primary-600/70 font-semibold" bind:this={tooltip}>
  {title}
</span>

{#if isHovered}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={twMerge("absolute z-40 max-w-[200px] p-2 flex flex-col items-center", positionClasses[position])}
    style={getStyles()}
    transition:fly={flyOptions}
    aria-expanded="true"
    bind:this={tooltipContent}
    onmouseenter={showTooltip}
    onmouseleave={hideTooltip}
  >
    <div class="text-sm dark:bg-neutral-950 bg-neutral-200 text-neutral-500 dark:text-neutral-400 p-2 rounded-md relative">
      {@render children()}
      <svg xmlns="http://www.w3.org/2000/svg" class="size-6 absolute text-neutral-200 dark:text-neutral-950 {arrowPositionClasses[position]}" viewBox="0 0 40 40">
        <path fill="currentColor" d="M4.659 11.833h30.682L20 32.167z" />
      </svg>
    </div>
  </div>
{/if}
