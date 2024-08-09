import { getTree } from "./pages";
import FlexSearch from 'flexsearch';

function flattenPages(sidebar) {
  let newPages = [];
  function traverse(items) {
    for (const item of items) {
      if (item.url) {
        newPages.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }
  traverse(sidebar);
  return newPages;
}

let posts;
let postsIndex;

export function createPostsIndex() {
  const tree = getTree();
  const pages = flattenPages(tree);

  // create the posts index
	postsIndex = new FlexSearch.Index({ tokenize: 'forward' })

	pages.forEach((post, i) => {
    // index the title and content together
    const item = `${post.name} ${post.description}`;
    // add the item to the index 👍️
    postsIndex.add(i, item);
  });


	posts = pages;
}


export function searchPostsIndex(searchTerm) {
  // escape special regex characters
	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // return matching post indexes 💪
	const results = postsIndex.search(match)


	return results
    // filter the posts based on the matched index
		.map((index) => posts[index])
    // you can do whatever you want at this point 👌
		.map(({ name, description, ...restProps }) => {
			return {
        // replace match in title with a marker
				name: replaceTextWithMarker(name, match),
        // match words in post and replace matches with marker
				description: getMatches(description, match),
        ...restProps
			}
		})
}


function getMatches(text, searchTerm, limit = 1) {
	// create dynamic regex 😎
	const regex = new RegExp(searchTerm, 'gi')
  // word indexes
	const indexes = []
  // matches count
	let matches = 0
  // current match in loop
	let match

	while ((match = regex.exec(text)) !== null && matches < limit) {
		// push that shit
    indexes.push(match.index)
		// increment matches
		matches++
	}

  // take the word index...
	return indexes.map((index) => {
    // go back 20 characters
		const start = index - 20
    // go forward 80 characters
		const end = index + 80
    // yoink the text
		const excerpt = text.substring(start, end).trim()
    // return excerpt 🤝
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`
	})
}

function replaceTextWithMarker(text, match) {
  // create dynamic regex 😎
	const regex = new RegExp(match, 'gi')
  // preserves the text casing 🤙
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
}
