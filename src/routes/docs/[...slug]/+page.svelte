<script>
	// Import code stylesheet
	import '../../../code.css';
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils';
	import { newToast } from '$lib/stores';
	import { pageByUrl } from '$lib/pages';
	import { afterNavigate } from '$app/navigation';

	let data = $state({});
	let slug = $derived(decodeURIComponent($page.url.pathname));

	afterNavigate(fetchPageData);

	function fetchPageData() {
		const page = pageByUrl(slug);
		if (!page) {
			throw new Error(`Page not found: ${slug}`);
		}
		data = page;
    document.title = data?.name ?? 'Docs';

    setTimeout(() => {
			addCopyCodeButtonFunctionality();
		}, 100);
	}

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

{#key data?.name}
	<main class="grow p-2 max-w-screen-xl">
		{#if !data}
			<p>Loading...</p>
		{:else if data === undefined}
			<p>Page not found</p>
		{:else}
			<section class="mb-6">
				{#if data?.name}
					<h1>{data.name}</h1>
				{/if}
				{#if data?.lastModified}
					<small class="mb-1">{formatDate(new Date(data.lastModified))}</small>
				{/if}
				{#if data?.description}
					<p>{data.description}</p>
				{/if}
			</section>
			<svelte:component this={data?.component} />
		{/if}
	</main>
{/key}
