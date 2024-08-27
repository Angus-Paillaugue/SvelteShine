<script>
  import Toc from './Toc.svelte';
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';
  import { afterNavigate } from '$app/navigation';
  import { spring } from 'svelte/motion';

  let { headings = $bindable([]), root = false } = $props();
  let headingScrolls = $state({});
  const topTriggerOffset = 10;
  let indicatorHeight = spring(0, {
    stiffness: 0.1,
    damping: 0.25
  });
  let indicatorCoords = spring(0, {
    stiffness: 0.05,
    damping: 0.25
  });

  afterNavigate(() => {
    if (!root) return;

    headingScrolls = {};

    // Reset she active heading indicator if the page is shorter than the viewport
    if(document.body.scrollHeight <= window.innerHeight) {
      indicatorHeight.set(0);
      indicatorCoords.set(0);
    }

    setTopPos(headings);
    const navBar = document.getElementsByTagName('nav')[0];
    const topOffset = topTriggerOffset + navBar.clientHeight;
    // On scroll event handler
    windowScrollHandler(topOffset);
    window.addEventListener('scroll', () => {
      windowScrollHandler(topOffset);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        windowScrollHandler(topOffset);
      });
    };
  });

  $effect(() => {
    setTopPos(headings);
  })

  /**
   * Function to handle window scroll events.
   *
   * @param {number} offset - The offset value.
   */
  function windowScrollHandler(offset) {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
    // Calculate the progress based on how much the user has scrolled relative to the maximum scroll position
    const progress = scrollPosition / maxScrollPosition;

    // Interpolate the trigger value between offset and window.innerHeight
    // As progress goes from 0 to 1, trigger smoothly moves from scrollPosition + offset to scrollPosition + window.innerHeight
    const trigger = scrollPosition + offset + progress * (window.innerHeight - offset);
    let activeHeadingInSidebar;

    // Find the lowest heading that is above the trigger
    for (let i in headingScrolls) {
      if (headingScrolls[i] <= trigger) {
        const currentHeading = document.querySelector(`[href="#${i}"]`);
        if (!currentHeading) return;
        activeHeadingInSidebar = currentHeading;
      }
    }
    if (!activeHeadingInSidebar) return;
    $indicatorCoords = activeHeadingInSidebar.offsetTop;
    $indicatorHeight = activeHeadingInSidebar.offsetHeight;
  }

  /**
   * Sets the top position of headings.
   *
   * @param {Array} headings - The array of headings.
   */
  function setTopPos(headings) {
    headings.forEach(function (e) {
      const element = document.getElementById(e.id);
      if (!element) return;
      headingScrolls[e.id] = element.getBoundingClientRect().top + window.scrollY;

      if (e.children.length > 0) {
        setTopPos(e.children);
      }
    });
  }
</script>

{#if headings.length > 0}
  <div>
    {#if root}
      <p
        class="m-0 mb-1 flex flex-row items-center gap-1 font-['Poppins'] text-base font-medium text-black text-wrap-balance dark:text-white"
      >
        <Icon icon="line-md:menu-unfold-right" class="size-4" />On this page
      </p>
    {/if}
    <div
      class={cn(root ? 'relative border-l border-main pb-1 pl-4 dark:border-main-dark' : 'ml-2')}
    >
      <!-- TOC Indicator -->
      {#if root}
        <div
          class="absolute -left-[2px] h-[1.4rem] w-[3px] rounded-full bg-primary-500"
          style="top: {$indicatorCoords}px; height: {$indicatorHeight}px;"
        ></div>
      {/if}
      <ol>
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
              <Toc headings={heading.children} />
            {/if}
          </li>
        {/each}
      </ol>
    </div>
  </div>
{/if}
