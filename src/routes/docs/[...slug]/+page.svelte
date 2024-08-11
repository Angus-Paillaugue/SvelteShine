<script>
  import { formatDate } from '$lib/utils';
  import { newToast } from '$lib/stores';
  import Navbar from '$lib/components/core/Navbar.svelte';
  import { siteDescription } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import Pagination from './Pagination.svelte';

  const { data } = $props();

  afterNavigate(() => {
    addCopyCodeButtonFunctionality();
    // createToc();
  });

  /**
   * Adds functionality to the copy code button.
   */
  function addCopyCodeButtonFunctionality() {
    const copyCodeButtons = document.querySelectorAll('.copy-code-button');
    copyCodeButtons.forEach((copyButton) => {
      // On copy code button click
      copyButton.onclick = () => {
        // Change the button icon to a checkmark
        copyButton.querySelector('.copy').classList.add('hidden');
        copyButton.querySelector('.copied').classList.remove('hidden');
        const textToCopy = copyButton.parentElement.querySelector('code').innerText;
        // Write the code to clipboard
        navigator.clipboard.writeText(textToCopy);
        // Show toast
        newToast({
          title: 'Copied to clipboard',
          message: 'The code has been copied to your clipboard',
          type: 'green'
        });
        setTimeout(() => {
          // Reset the button icon back to default
          copyButton.querySelector('.copy').classList.remove('hidden');
          copyButton.querySelector('.copied').classList.add('hidden');
        }, 2000);
      };
    });
  }

  /**
   * Creates a table of contents (TOC).
   *
   * @function createToc
   * @returns {void}
   */
  function createToc() {
    // TODO : Fix h2 being side to side with h1's on the Configuration > Colors page
    const pageContainer = document.querySelector('#pageContainer');
    const tocContainer = document.querySelector('#tableOfContents');

    // Select all headings within the page container
    const headings = pageContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // Create the root of the ToC
    const tocList = document.createElement('ol');
    let currentLevel = 1;
    let currentList = tocList;
    let parents = [tocList];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1));
      const listItem = document.createElement('li');
      listItem.classList.add('mb-2', level === 1 ? 'list-none' : 'list-disc');

      // Create anchor for smooth scrolling
      const anchor = document.createElement('a');
      const headingId = heading.textContent.replace(/\s+/g, '-').toLowerCase();
      heading.id = headingId;
      anchor.href = `#${headingId}`;
      anchor.classList.add('hover:underline', 'max-w-[50px]', 'truncate');
      anchor.textContent = heading.textContent;

      listItem.appendChild(anchor);

      // Adjust the list according to the heading level
      if (level > currentLevel) {
        const newList = document.createElement('ol');
        newList.classList.add('ml-4');
        currentList.lastElementChild?.appendChild(newList);
        parents.push(currentList);
        currentList = newList;
      } else if (level < currentLevel) {
        currentList = parents[level - 1];
        parents = parents.slice(0, level);
      }

      currentList.appendChild(listItem);
      currentLevel = level;
    });

    tocContainer.appendChild(tocList);

    // Highlight the currently viewed heading in the ToC
    highlightCurrentHeading(headings, tocContainer);
  }

  /**
   * Highlights the currently viewed heading in the TOC.
   *
   * @function highlightCurrentHeading
   * @param {NodeList} headings - The list of headings in the document.
   * @param {HTMLElement} tocContainer - The TOC container element.
   * @returns {void}
   */
  function highlightCurrentHeading(headings, tocContainer) {
    return;
    // TODO : Fix this
    // const tocLinks = tocContainer.querySelectorAll("a");

    // // Create an IntersectionObserver to observe headings
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       // Remove the 'active' class from all TOC links
    //       tocLinks.forEach(link => link.classList.remove("text-blue-500", "font-bold"));

    //       // Find the corresponding TOC link and add the 'active' class
    //       const activeLink = tocContainer.querySelector(`a[href="#${entry.target.id}"]`);
    //       if (activeLink) {
    //         activeLink.classList.add("text-blue-500", "font-bold");
    //       }
    //     }
    //   });
    // }, {
    //     threshold: 0.1 // Trigger when 60% of the heading is in view
    // });

    // // Observe each heading
    // headings.forEach(heading => observer.observe(heading));
  }
</script>

<svelte:head>
  <title>{data?.name ?? 'Docs'}</title>
  <meta property="og:title" content={data?.name ?? 'Docs'} />
  <meta property="twitter:title" content={data?.name ?? 'Docs'} />

  <meta name="description" content={data?.description ?? siteDescription} />
  <meta property="og:description" content={data?.description ?? siteDescription} />
  <meta property="twitter:description" content={data?.description ?? siteDescription} />
</svelte:head>

<div class="flex flex-col w-full min-h-screen">
  {#key data?.name}
    <Navbar title={data?.name ?? 'Docs'} />

    <div class="flex flex-row justify-center mx-auto max-w-screen-lg w-full h-full grow">
      <main class="grow p-2 flex flex-col w-full shrink-0 h-full">
        {#if data?.lastModified || data?.description}
          <section class="mb-6">
            {#if data?.lastModified}
              <small class="mb-1">{formatDate(new Date(data.lastModified))}</small>
            {/if}
            {#if data?.description}
              <p class="m-0">{data.description}</p>
            {/if}
          </section>
        {/if}
        {#if data?.component}
          <section id="pageContainer">
            <svelte:component this={data.component} />
          </section>
        {/if}

        <Pagination slug={data.slug} />
      </main>
      <!-- <div
        id="tableOfContents"
        class="ml-4 max-md:hidden sticky top-24 h-fit py-4 px-2 w-fit text-nowrap"
      ></div> -->
    </div>
  {/key}
</div>
