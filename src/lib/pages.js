import { pages, docsUrlStart } from '$conf';

/**
 * Retrieves all pages grouped by their URL.
 * @returns {Object} An object of pages grouped by URL.
 */
export function allPages() {
	// USER CONFIG : Change the path according to docsUrlStart in the user-config.js file
	const docs = import.meta.glob('/docs/**/*', { eager: true });

	const updatedPages = JSON.parse(JSON.stringify(pages));

	// Internal recursive function to traverse and add metadata
	function traverseAndAddMetadata(pages, baseUrl = '') {
		return pages.map((page) => {
			if (typeof page === 'string') {
				const pageUrl = baseUrl + '/' + page;
				// If the page is a string, create an object with the name and add metadata
				const docKey = Object.keys(docs).find((key) => key.includes(page));
				const metadata = docs[docKey] || {};
				return { name: page, ...metadata.metadata, component: metadata.default, url: pageUrl };
			} else if (page.children) {
				// If the page has children, recursively add metadata to the children
				const updatedChildren = traverseAndAddMetadata(page.children, baseUrl + '/' + page.name);
				return { ...page, children: updatedChildren };
			} else {
				// Add metadata to the page
				const docKey = Object.keys(docs).find((key) => key.includes(page.name));
				const metadata = docs[docKey] || {};
				const pageUrl = baseUrl + '/' + page.name;
				return { ...page, ...metadata.metadata, component: metadata.default, url: pageUrl };
			}
		});
	}

	return traverseAndAddMetadata(updatedPages, docsUrlStart);
}

/**
 * Retrieves a page by its url.
 * @param {string} url - The url of the page.
 * @returns {Object} The page object.
 */
export function pageByUrl(path) {
	const pages = allPages();

	function findPageByPath(pages, path) {
		for (let page of pages) {
			if (page.url === path) {
				return page;
			} else if (page.children) {
				const result = findPageByPath(page.children, path);
				if (result) {
					return result;
				}
			}
		}
		return null;
	}

	return findPageByPath(pages, path);
}
