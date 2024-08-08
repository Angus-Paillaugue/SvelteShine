import { createHighlighter } from 'shiki';
import { parse } from 'node-html-parser';
// If you want to add other transformers for code blocks visit https://shiki.style/packages/transformers
import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerNotationHighlight
} from '@shikijs/transformers';
import { codeBlockTheme } from '../../user-config.js';

const transformers = [
  transformerNotationDiff(),
  transformerMetaHighlight(),
  transformerNotationHighlight()
];

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {Promise<string>} - highlighted html
 */
async function highlighter(code, lang, meta) {
  const highlighter = await createHighlighter({
    langs: [lang],
    themes: [codeBlockTheme]
  });

  let html;
  if (!meta) {
    html = highlighter.codeToHtml(code, {
      lang,
      theme: codeBlockTheme,
      transformers
    });
  } else {
    html = highlighter.codeToHtml(code, {
      lang,
      theme: codeBlockTheme,
      transformers,
      meta: { __raw: meta }
    });
  }

  highlighter.dispose();

  html = makeFocusable(html);
  html = customCodeBlocks(html);
  html = customLinks(html);
  return escapeHtml(html);
}

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} html - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
  );
}

/**
 * Replaces the <pre> tags in the provided HTML string with a modified version that includes a copy code button.
 *
 * @param {string} html - The HTML string to modify.
 */
function customCodeBlocks(html) {
  return html.replace(
    /<pre\b([^>]*)>/g,
    '<pre$1><button tabindex="0" class="copy-code-button" name="copy-code"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copy" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.993.993 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4zm0 2H5v14h14V6h-2v2H7zm2-2v2h6V4z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copied hidden" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15.17l9.192-9.191l1.414 1.414L10 17.999l-6.364-6.364l1.414-1.414z"></path></svg></button>'
  );
}

/**
 * Replaces the anchor tags in the provided HTML string with anchor tags having a custom class.
 *
 * @param {string} html - The HTML string to modify.
 * @returns {string} The modified HTML string with custom class anchor tags.
 */
function customLinks(html) {
  return html.replace(/<a\b([^>]*)>/g, '<a $1 class="link">');
}

/**
 * @param html {string} - code to highlight
 * @returns {string} - highlighted html
 */
function makeFocusable(html) {
  const root = parse(html);
  root.querySelector('pre').setAttribute('tabIndex', '0');
  return root.toString();
}

export default highlighter;
