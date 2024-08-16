import { getTree } from './pages';
import FlexSearch from 'flexsearch';
import { flattenPages } from './utils';

let pages;
let pagesIndex;

/**
 * Creates an index of page.
 *
 * @returns {void}
 */
export function createPagesIndex() {
  const tree = getTree();
  const flattenedPages = flattenPages(tree);

  // create the pages index
  pagesIndex = new FlexSearch.Index({ tokenize: 'forward' });

  flattenedPages.forEach((page, i) => {
    // index the title and content together
    const item = `${page.name} ${page.description}`;
    // add the item to the index 👍️
    pagesIndex.add(i, item);
  });

  pages = flattenedPages;
}

/**
 * Searches the pages index for a given search term and returns the matching page indexes.
 *
 * @param {string} searchTerm - The search term to match against the page indexes.
 * @returns {Array} - An array of matching page indexes.
 */
export function searchPagesIndex(searchTerm) {
  // escape special regex characters
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // return matching page indexes 💪
  const results = pagesIndex.search(match);

  return (
    results
      // filter the pages based on the matched index
      .map((index) => pages[index])
      // you can do whatever you want at this point 👌
      .map(({ name, description, ...restProps }) => {
        return {
          // replace match in title with a marker
          name: replaceTextWithMarker(name, match),
          // match words in page and replace matches with marker
          description: getMatches(description, match),
          ...restProps
        };
      })
  );
}

/**
 * Retrieves the matches of a search term within a given text.
 *
 * @param {string} text - The text to search within.
 * @param {string} searchTerm - The term to search for.
 * @param {number} [limit=1] - The maximum number of matches to retrieve.
 * @returns {string[]} An array of excerpts containing the search term.
 */
function getMatches(text, searchTerm, limit = 1) {
  // create dynamic regex 😎
  const regex = new RegExp(searchTerm, 'gi');
  // word indexes
  const indexes = [];
  // matches count
  let matches = 0;
  // current match in loop
  let match;

  while ((match = regex.exec(text)) !== null && matches < limit) {
    // push that shit
    indexes.push(match.index);
    // increment matches
    matches++;
  }

  // take the word index...
  return indexes.map((index) => {
    // go back 20 characters
    const start = index - 20;
    // go forward 80 characters
    const end = index + 80;
    // yoink the text
    const excerpt = text.substring(start, end).trim();
    return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
  });
}

/**
 * Replaces all occurrences of a given match in a text with a marker.
 *
 * @param {string} text - The text to search and replace.
 * @param {string} match - The match to search for.
 * @returns {string} The text with the matches replaced by markers.
 */
function replaceTextWithMarker(text, match) {
  // create dynamic regex 😎
  const regex = new RegExp(match, 'gi');
  // preserves the text casing 🤙
  return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
