<script>
	import PageList from './PageList.svelte';
	import { page } from '$app/stores';

	const { pages = [], root = false } = $props();
	const isNested = (page) => page.children && Object.keys(page.children).length > 0;
	const pathname = $derived(decodeURIComponent($page.url.pathname));

	// USER CONFIG : Customize the sidebar colors
	const itemColors = 'text-primary-800 dark:text-primary-100 hover:text-primary-900 hover:bg-primary-200 dark:hover:bg-primary-700 dark:hover:bg-primary-800';
	const activeItemColors = 'text-primary-900 bg-primary-300 dark:bg-primary-700 dark:text-primary-300';

	function generateUniqSerial() {
		return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
</script>

<div class="pl-2 {!root && "border-l border-primary-300 dark:border-primary-700"} flex flex-col gap-2">
	{#each pages as page}
		{#if isNested(page)}
			{@const id = generateUniqSerial()}
			<div>
				<input type="checkbox" id="accordion-{id}" class="hidden" />
				<label
					for="accordion-{id}"
					class="p-2 transition-all flex flex-row justify-between items-center {itemColors} rounded cursor-pointer font-bold"
				>
					{page.name}
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 arrow"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</button>
				</label>
				<div class="p-1 pl-4 hidden overflow-hidden">
					<PageList pages={page.children} />
				</div>
			</div>
		{:else}
			<a
				href={page.url}
				class="block p-2 transition-all rounded cursor-pointer font-semibold {pathname === page.url
					? activeItemColors
					: itemColors}"
			>
				{page.name}
			</a>
		{/if}
	{/each}
</div>

<style>
	/* Dropdown items */
	input:checked + label + div {
		display: block;
		animation: slideDown 0.3s ease-out;
	}
	input:not(:checked) + label + div {
		animation: slideUp 0.3s ease-out;
	}
	@keyframes slideDown {
		from {
			max-height: 0;
			opacity: 0;
		}
		to {
			max-height: 500px;
			opacity: 1;
		}
	}
	@keyframes slideUp {
		from {
			max-height: 500px;
			opacity: 1;
		}
		to {
			max-height: 0;
			opacity: 0;
		}
	}

	/* Dropdown arrow */
	input:checked + label .arrow {
		transform: rotate(180deg);
	}
	.arrow {
		transition: transform 0.3s ease-out;
	}
</style>
