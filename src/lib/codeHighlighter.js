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
  transformerNotationHighlight(),
  {
    name: '@shikijs/transformers:line-numbers',
    postprocess(code) {
      return code.replace(/<pre class="\b([^>]*)>/g, '<pre class="line-numbers $1>');
    }
  }
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
      transformers: meta.includes('no-lines-numbers') ? transformers.slice(0, -1) : transformers,
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
    '<pre$1><button tabindex="0" class="copy-code-button" name="copy-code"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copy" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6t.713.288T5 7v13h10q.425 0 .713.288T16 21t-.288.713T15 22zm4-6V4z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="w-6 h-6 copied hidden" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path></svg></button>'
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
