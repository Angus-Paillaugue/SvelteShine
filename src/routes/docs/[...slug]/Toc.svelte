<script>
  import Toc from './Toc.svelte';
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';
  import { afterNavigate } from '$app/navigation';
  import imageZoomPlugin from './image-zoom-plugin';
  import { onMount } from 'svelte';

  let { headings, root = false } = $props();
  let headingScrolls = $state({});
  let tocIndicator = $state();
  const topTriggerOffset = 10;

  afterNavigate(load);
  onMount(load);

  /**
   * On window load event handler.
   *
   */
  function load() {
    if (!root) return;

    // On scroll event handler
    setTopPos(headings);
    const navBar = document.getElementsByTagName('nav')[0];
    const topOffset = topTriggerOffset + navBar.clientHeight;
    windowScrollHandler(topOffset);
    window.addEventListener('scroll', () => {
      windowScrollHandler(topOffset);
    });

    imageZoomPlugin();

    return () => {
      window.removeEventListener('scroll', windowScrollHandler(topOffset));
    };
  }

  /**
   * Function to handle window scroll events.
   *
   * @param {number} offset - The offset value.
   */
  function windowScrollHandler(offset) {
    if (!tocIndicator) return;
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
    // Calculate the progress based on how much the user has scrolled relative to the maximum scroll position
    const progress = scrollPosition / maxScrollPosition;

    // Interpolate the trigger value between offset and window.innerHeight
    // As progress goes from 0 to 1, trigger smoothly moves from scrollPosition + offset to scrollPosition + window.innerHeight
    const trigger = scrollPosition + offset + progress * (window.innerHeight - offset);

    for (let i in headingScrolls) {
      if (headingScrolls[i] <= trigger) {
        const activeHeadingInSidebar = document.querySelector(`[href="#${i}"]`);
        if (!activeHeadingInSidebar) return;
        const activeHeadingInSidebarTop = activeHeadingInSidebar.offsetTop;
        tocIndicator.style.top = activeHeadingInSidebarTop + 'px';
      }
    }
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
      <h6 class="m-0 flex flex-row items-center gap-1 mb-1 text-base font-medium">
        <Icon icon="line-md:menu-unfold-right" class="size-4" />On this page
      </h6>
    {/if}

    <ol
      class={cn(root ? 'relative border-l border-main pl-4 dark:border-main-dark py-1' : 'ml-1.5')}
    >
      {#if root}
        <div
          class="absolute -left-[2px] h-[1.4rem] w-[3px] rounded-full bg-primary-500 transition-[top,opacity] ease-[cubic-bezier(0,1,.5,1)]"
          bind:this={tocIndicator}
        ></div>
      {/if}
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
{/if}
