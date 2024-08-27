/**
 * Formats a given date using the specified date style and locale.
 * @param {Date} date - The date to format.
 * @param {string} [dateStyle='medium'] - The style of the date. Defaults to 'medium'.
 * @param {string} [locales='en'] - The locale to use for formatting. Defaults to 'en'.
 * @returns {string} The formatted date.
 */
export function formatDate(date, dateStyle = 'medium', locales = 'en') {
  // Safari is mad about dashes in the date
  const dateFormatter = new Intl.DateTimeFormat(locales, {
    dateStyle,
    timezone: 'UTC'
  });
  return dateFormatter.format(date);
}

/**
 * Flattens the pages in the sidebar.
 *
 * @param {Array} tree - The sidebar containing the pages.
 * @returns {Array} - The flattened array of pages.
 */
export function flattenPages(tree) {
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
  traverse(tree);
  return newPages;
}

/**
 * Creates an accordion effect on the specified node.
 * @param {HTMLElement} node - The HTML element to apply the accordion effect to.
 * @param {boolean} isOpen - Specifies whether the accordion is initially open or closed.
 * @returns {Object} - An object with an `update` method to control the accordion state.
 */
export function accordion(node, isOpen) {
  let initialHeight = node.offsetHeight;
  node.style.height = isOpen ? 'auto' : 0;
  node.style.overflow = 'hidden';
  return {
    update(isOpen) {
      let animation = node.animate(
        [
          {
            height: initialHeight + 'px',
            overflow: 'hidden'
          },
          {
            height: 0,
            overflow: 'hidden'
          }
        ],
        { duration: 150, fill: 'both' }
      );
      animation.pause();
      if (!isOpen) {
        animation.play();
      } else {
        animation.reverse();
      }
    }
  };
}

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a string into a slug by replacing spaces with hyphens.
 *
 * @param {string} path - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(path) {
  return path.replace(/ /g, '-');
}

/**
 * Reveal the specified node with the given options.
 *
 * @param {Node} node - The node to reveal.
 * @param {Object} options - The options for revealing the node.
 */
export function reveal(node, options) {
  // Set the default options
  const baseOptions = {
    y: 8, // The y translation value in pixels
    duration: 300, // The duration of the transition in milliseconds
    bottomMargin: 100, // The bottom margin in pixels
    once: false, // Whether to only reveal once
    threshold: 0.5 // The threshold for the IntersectionObserver
  };

  // Merge the base options with the provided options
  options = { ...baseOptions, ...options };

  // Create the observer options object
  const observerOptions = {
    rootMargin: `0px 0px -${options.bottomMargin}px 0px`,
    threshold: options.threshold
  };

  // Set the initial styles
  node.style.willChange = 'transform, opacity';

  /**
   * Toggles the appear/disappear styles of the node.
   */
  const toggleStyles = (visible) => {
    node.style.transition = `transform ${options.duration}ms, opacity ${options.duration}ms`;
    if (visible) {
      node.style.opacity = 1;
      node.style.transform = 'translateY(0)';
    } else {
      node.style.opacity = 0;
      node.style.transform = `translateY(${options.y}px)`;
    }
    setTimeout(() => {
      node.style.transition = '';
    }, options.duration);
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(intersect);
  }, observerOptions);

  // Observe the node
  observer.observe(node);

  /**
   * Function to handle the intersection of the node.
   * @param {IntersectionObserverEntry} entry
   */
  function intersect(entry) {
    toggleStyles(entry.isIntersecting);
    // Unobserve the node if the once option is true
    if (entry.isIntersecting && options.once) observer.unobserve(entry.target);
  }

  // Return the destroy function
  return {
    destroy() {
      observer.disconnect();
    }
  };
}
