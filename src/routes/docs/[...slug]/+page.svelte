<script>
  import { formatDate } from '$lib/utils';
  import { newToast } from '$lib/stores';
  import Navbar from '$lib/components/core/Navbar.svelte';
  import { siteDescription } from '$conf';
  import { afterNavigate } from '$app/navigation';
  import Nav from './Nav.svelte';

  const { data } = $props();

  afterNavigate(() => {
    addCopyCodeButtonFunctionality();
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

    <main class="grow p-2 max-w-screen-md mx-auto flex flex-col w-full h-full">
      {#if data?.lastModified || data?.description}
        <section class="mb-6">
          {#if data?.lastModified}
            <small class="mb-1">{formatDate(new Date(data.lastModified))}</small>
          {/if}
          {#if data?.description}
            <p>{data.description}</p>
          {/if}
        </section>
      {/if}
      {#if data?.component}
        <section>
          <svelte:component this={data.component} />
        </section>
      {/if}

      <Nav slug={data.slug} />
    </main>
  {/key}
</div>
