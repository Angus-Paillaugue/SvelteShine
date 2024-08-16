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
    dateStyle
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
 * A collection of utility functions for working with URLs.
 */
export const urlHealer = {
  /**
   * Separates the identifier and slug from a given URL.
   * @param {string} url - The URL to separate.
   * @returns {Object} An object containing the separated identifier and slug.
   * - id: The identifier extracted from the URL.
   * - slug: The slug extracted from the URL.
   */
  identifier: {
    separate: (url) => {
      const regex = /(\d+)$/;
      const [, id] = url.match(regex) || [];
      const rest = url
        .replace(regex, '')
        .split('-')
        .filter((e) => e);

      return {
        id: Number(id),
        slug: rest.join('-')
      };
    },
    /**
     * Joins the slug and identifier to form a URL.
     * @param {string} slug - The slug part of the URL.
     * @param {string} id - The identifier part of the URL.
     * @returns {string} The joined URL.
     */
    join: (slug, id) => `${slug}-${id}`
  },
  /**
   * Sanitizes a given URL by removing special characters and converting it to lowercase.
   * @param {string} url - The URL to sanitize.
   * @returns {string} The sanitized URL.
   */
  sanitize: (url) =>
    url
      .trim()
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')
      .toLowerCase()
};

import { newToast } from '$lib/stores';
/**
 * Adds functionality to the copy code button.
 */
export function addCopyCodeButtonFunctionality() {
  const copyCodeButtons = document.querySelectorAll('.copy-code-button');
  copyCodeButtons.forEach((copyButton) => {
    // On copy code button click
    copyButton.onclick = () => {
      // Change the button icon to a checkmark
      copyButton.querySelector('.copy').style.display = 'none';
      copyButton.querySelector('.copied').style.display = 'block';
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
        copyButton.querySelector('.copy').style.display = 'block';
        copyButton.querySelector('.copied').style.display = 'none';
      }, 2000);
    };
  });
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
