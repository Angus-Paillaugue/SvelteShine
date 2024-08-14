import { visit } from 'unist-util-visit';

/**
 * Transforms images in a given tree by wrapping them in a figure element with optional caption.
 *
 * @param {Object} tree - The tree object to transform.
 * @returns {Function} - A function that performs the image transformation.
 */
export function imageTransformer() {
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      let src = node.url;
      const alt = node.alt;
      const caption = props['data-caption'];

      let newNode = null;
      if (caption) {
        newNode = {
          type: 'html',
          value: `
            <div class="page-image-container">
              <figure role="figure" alt="${alt}">
                <img src="${src}" alt="${alt}" class="page-image" />
                <figcaption>${caption}</figcaption>
              </figure>
            </div>
          `
        };
      } else {
        newNode = {
          type: 'html',
          value: `<div class="page-image-container"><img src="${src}" class="page-image" alt="${alt}" /></div>`
        };
      }

      Object.assign(parent, newNode);
    });
  };
}

/**
 * Transforms links in a tree by adding classes and attributes.
 * @returns {Function} A function that accepts a tree and applies the link transformation.
 */
export function linkTransformer() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      // Add the link class to all links
      props.class = 'link';

      // If the link is pointing to an external site, add the target, rel attributes and icon
      if (node.url.startsWith('http')) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
        node.children.push({
          type: 'html',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="newTabIcon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h14v-6q0-.425.288-.712T20 12t.713.288T21 13v6q0 .825-.587 1.413T19 21zM19 6.4L10.4 15q-.275.275-.7.275T9 15t-.275-.7t.275-.7L17.6 5H15q-.425 0-.712-.288T14 4t.288-.712T15 3h5q.425 0 .713.288T21 4v5q0 .425-.288.713T20 10t-.712-.288T19 9z"/>
            </svg>
          `
        });
      }
    });
  };
}

/**
 * Transforms headings in a tree by replacing HTTP methods with styled HTML elements.
 *
 * @param {Object} tree - The tree object to be transformed.
 * @returns {Function} - A function that performs the transformation on the given tree.
 */
export function headingTransformer() {
  const httpMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'TRACE'
  ];

  const getHttpMethod = (text) =>
    httpMethods.find((method) => text.toUpperCase().startsWith(method));
  return (tree) => {
    visit(tree, 'heading', (node) => {
      for (const child of node.children) {
        const text = child.value;
        const matchingMethod = getHttpMethod(text);

        if (matchingMethod) {
          child.value = text.replace(
            matchingMethod,
            `<span class="http-keyword" data-keyword="${matchingMethod}">${matchingMethod}</span>`
          );
        }
      }
    });
  };
}

/**
 * Wraps table into a div.table-container
 *
 * @param {Object} tree - The tree object to be transformed.
 * @returns {Function} - A function that performs the transformation on the given tree.
 */
export function tableTransformer() {
  return (tree) => {
    visit(tree, 'table', (node, index, parent) => {
      const wrapper = {
        type: 'element',
        tagName: 'div',
        data: {hProperties: { className: 'table-container' }},
        children: [node]
      };

      parent.children[index] = wrapper;
    });
  };
}
