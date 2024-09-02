import { createHighlighter } from 'shiki';

import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerNotationHighlight
} from '@shikijs/transformers'; /** @see https://shiki.style/packages/transformers  */
import { colors } from '../../project.config.js';

const { codeBlockThemes } = colors;

const transformers = [
  transformerNotationDiff(),
  transformerMetaHighlight(),
  transformerNotationHighlight()
];

function parseMeta(meta) {
  const metaArray = meta?.split(' ');
  let name = '';
  let icon = true;
  let lineNumbers =
    metaArray && metaArray.some((item) => item.startsWith('line-numbers'));
  let copyCode =
    metaArray && !metaArray.some((item) => item.startsWith('no-copy'));
  const snippet =
    metaArray && metaArray.some((item) => item.startsWith('snippet'));
  if (metaArray && metaArray.some((item) => item.startsWith('name='))) {
    name = metaArray
      .find((item) => item.startsWith('name='))
      .slice(5)
      .replace(/"/g, '')
      .replace(/'/g, '');
  }
  if (metaArray && metaArray.some((item) => item.startsWith('icon='))) {
    icon =
      metaArray
        .find((item) => item.startsWith('icon='))
        .slice(5)
        .replace(/"/g, '')
        .replace(/'/g, '') === 'true';
  }

  return { name, icon, lineNumbers, copyCode, snippet };
}

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {Promise<string>} - highlighted html
 */
async function highlighter(code, lang, meta) {
  const highlighter = await createHighlighter({
    langs: [lang],
    themes: Object.values(codeBlockThemes)
  });

  const { name, icon, lineNumbers, copyCode, snippet } = parseMeta(meta);

  let html;
  if (!meta) {
    html = highlighter.codeToHtml(code, {
      lang,
      themes: codeBlockThemes,
      transformers: transformers
    });
  } else {
    html = highlighter.codeToHtml(code, {
      lang,
      themes: codeBlockThemes,
      transformers: transformers,
      meta: { __raw: meta }
    });
  }

  highlighter.dispose();
  return escapeHtml(
    `<Components.pre name="${name}" icon="${icon}" lineNumbers=${lineNumbers} copyCode=${copyCode} snippet=${snippet}>` +
      html +
      `</Components.pre>`
  );
}

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} html - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) =>
      ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
  );
}

export default highlighter;
