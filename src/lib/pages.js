import { pages, docsUrlStart } from '$conf';
import { slugify } from './utils';

/**
 * Retrieves the tree structure of pages with added metadata.
 *
 * @returns {Array} The tree structure of pages with added metadata.
 */
export function getTree() {
  const docs = import.meta.glob('/docs/**/*', { eager: true });

  const updatedPages = JSON.parse(JSON.stringify(pages));

  // Internal recursive function to traverse and add metadata
  function traverseAndAddMetadata(pages, baseUrl = '') {
    return pages.map((page) => {
      if (typeof page === 'string') {
        const pageUrl = slugify(baseUrl + '/' + page);
        // If the page is a string, create an object with the name and add metadata
        const docKey = Object.keys(docs)
          .map((el) => {
            let filename = el.split('/').pop().split('.')[0];
            if (filename == page) return el;
          })
          .filter((el) => el);
        const metadata = docs[docKey] || {};
        const slug = slugify(pageUrl.replace(docsUrlStart + '/', ''));
        return {
          name: page,
          ...metadata.metadata,
          component: metadata.default,
          url: pageUrl,
          filePath: docKey,
          slug
        };
      } else if (page.children) {
        // If the page has children, recursively add metadata to the children
        const updatedChildren = traverseAndAddMetadata(
          page.children,
          baseUrl + '/' + page.name
        );
        return { ...page, children: updatedChildren };
      } else {
        // Add metadata to the page

        const docKey = Object.keys(docs)
          .map((el) => {
            let filename = el.split('/').pop().split('.')[0];
            if (filename == page.name) return el;
          })
          .filter((el) => el);
        const metadata = docs[docKey] || {};
        const pageUrl = slugify(baseUrl + '/' + page.name);
        const slug = slugify(pageUrl.replace(docsUrlStart + '/', ''));
        return {
          ...page,
          ...metadata.metadata,
          filePath: docKey,
          component: metadata.default,
          url: pageUrl,
          slug
        };
      }
    });
  }

  return traverseAndAddMetadata(updatedPages, docsUrlStart);
}

/**
 * Retrieves a page by its slug.
 * @param {string} slug - The slug of the page.
 * @returns {Object} The page object.
 */
export async function pageBySlug(slug) {
  const pages = getTree();

  function findPageBySlug(pages, slug) {
    for (const page of pages) {
      if (page.slug === slug) return page;
      if (page.children) {
        const found = findPageBySlug(page.children, slug);
        if (found) return found;
      }
    }
  }
  return findPageBySlug(pages, slug);
}
