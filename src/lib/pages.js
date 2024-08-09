import { pages, docsUrlStart } from '$conf';

export function getTree() {
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
        const slug = pageUrl.replace(docsUrlStart + '/', '');
        return {
          name: page,
          ...metadata.metadata,
          component: metadata.default,
          url: pageUrl,
          slug
        };
      } else if (page.children) {
        // If the page has children, recursively add metadata to the children
        const updatedChildren = traverseAndAddMetadata(page.children, baseUrl + '/' + page.name);
        return { ...page, children: updatedChildren };
      } else {
        // Add metadata to the page
        const docKey = Object.keys(docs).find((key) => key.includes(page.name));
        const metadata = docs[docKey] || {};
        const pageUrl = baseUrl + '/' + page.name;
        const slug = pageUrl.replace(docsUrlStart + '/', '');
        return { ...page, ...metadata.metadata, component: metadata.default, url: pageUrl, slug };
      }
    });
  }

  return traverseAndAddMetadata(updatedPages, docsUrlStart);
}

/**
 * Retrieves a post by its slug.
 * @param {string} slug - The slug of the post.
 * @returns {Object} The post object.
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
