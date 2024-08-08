import { pages, docsUrlStart } from '$conf';

/**
 * Retrieves all posts.
 * @returns {Array} An array of post objects.
 */
export function allPages() {
  let posts = [];

  const paths = import.meta.glob('/docs/**/*.md', {
    eager: true
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').slice(2).join('/')?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const post = {
        ...file.metadata,
        slug
      };
      posts.push(post);
    }
  }

  return posts;
}

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
 * Retrieves a post by its slug.
 * @param {string} slug - The slug of the post.
 * @returns {Object} The post object.
 */
export async function postBySlug(slug) {
  const posts = allPages();
  return posts.find((post) => post.slug == slug);
}

/**
 * Calculates the tolerance between two strings.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {boolean} True if the tolerance is within the maximum tolerance, false otherwise.
 */
function isMatchingSearch(str1, str2) {
  return str1.includes(str2) || str2.includes(str1);
}

/**
 * Searches for posts based on a query.
 * @param {string} query - The search query.
 * @returns {Array} An array of post objects that match the search query.
 */
export function searchPosts(query) {
  const posts = allPages();
  const searchQuery = query.toLowerCase();

  return posts.filter((post) => {
    const { title, languages, categories } = post;
    const postTitle = title.toLowerCase();

    if (languages?.includes(searchQuery) || categories?.includes(searchQuery)) return true;
    if (isMatchingSearch(postTitle, searchQuery)) return true;

    return false;
  });
}
