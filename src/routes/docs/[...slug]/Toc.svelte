<script>
  import Icon from '@iconify/svelte';
  import { afterNavigate } from '$app/navigation';
  import { spring } from 'svelte/motion';
  import { Button } from '$lib/components';
  import TocList from './TocList.svelte';

  let { headings = $bindable([]) } = $props();
  let headingScrolls = $state({});
  let mobileTocVisible = $state(false);
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
    headingScrolls = {};

    // Reset she active heading indicator if the page is shorter than the viewport
    if (document.body.scrollHeight <= window.innerHeight) {
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
    window.addEventListener('click', windowClickHandler);

    return () => {
      window.removeEventListener('scroll', () => {
        windowScrollHandler(topOffset);
      });
      window.removeEventListener('click', windowClickHandler);
    };
  });

  $effect(() => {
    setTopPos(headings);
  });

  /**
   * Function to handle window scroll events.
   *
   * @param {number} offset - The offset value.
   */
  function windowScrollHandler(offset) {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    const maxScrollPosition =
      document.documentElement.scrollHeight - window.innerHeight;
    // Calculate the progress based on how much the user has scrolled relative to the maximum scroll position
    const progress = scrollPosition / maxScrollPosition;

    // Interpolate the trigger value between offset and window.innerHeight
    // As progress goes from 0 to 1, trigger smoothly moves from scrollPosition + offset to scrollPosition + window.innerHeight
    const trigger =
      scrollPosition + offset + progress * (window.innerHeight - offset);
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
    headings.forEach((e) => {
      const element = document.getElementById(e.id);
      if (!element) return;
      headingScrolls[e.id] =
        element.getBoundingClientRect().top + window.scrollY;

      if (e.children.length > 0) {
        setTopPos(e.children);
      }
    });
  }

  /**
   * Handles the click event on the window.
   *
   * @param {Event} e - The click event object.
   */
  function windowClickHandler(e) {
    if (e.target.closest('#tocContainer')) {
      mobileTocVisible = false;
    }
  }
</script>

<!-- Mobile toggle toc button -->
{#if headings.length > 0}
  <Button
    id="openToc"
    name="Toggle table of contents"
    onclick={() => (mobileTocVisible = !mobileTocVisible)}
    type="square ghost"
    class="fixed right-4 top-[4.5rem] z-40 flex items-center justify-center bg-body p-3 dark:bg-body-dark lg:hidden"
  >
    <Icon icon="line-md:menu-unfold-right" class="size-5" />
  </Button>
{/if}

<!-- Toc -->
<div
  class="lenis-prevent fixed top-16 overflow-y-auto transition-transform max-lg:inset-0 max-lg:z-30 max-lg:flex max-lg:flex-col max-lg:bg-body max-lg:pl-4 max-lg:pr-20 max-lg:pt-4 max-lg:dark:bg-body-dark lg:sticky lg:top-24 lg:h-fit lg:w-[250px] lg:shrink-0 lg:px-2 lg:py-4 lg:pb-8 {mobileTocVisible
    ? 'max-lg:translate-x-0'
    : 'max-lg:-translate-x-full'}"
  id="tocContainer"
>
  {#if headings.length > 0}
    <div>
      <p
        class="m-0 mb-1 flex flex-row items-center gap-1 font-['Poppins'] text-base font-medium text-black text-wrap-balance dark:text-white"
      >
        <Icon icon="line-md:menu-unfold-right" class="size-4" />On this page
      </p>
      <div
        class="relative border-l border-main pb-1 pl-4 dark:border-main-dark"
      >
        <!-- TOC Indicator -->
        <div
          class="absolute -left-[2px] h-[1.4rem] w-[3px] rounded-full bg-primary-500"
          style="top: {$indicatorCoords}px; height: {$indicatorHeight}px;"
        ></div>
        <TocList {headings} root={true} />
      </div>
    </div>
  {/if}
</div>
