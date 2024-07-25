import { createHighlighter } from 'shiki';
import { parse } from 'node-html-parser';
// If you want to add other transformers for code blocks visit https://shiki.style/packages/transformers
import {
	transformerNotationDiff,
	transformerMetaHighlight,
	transformerNotationHighlight
} from '@shikijs/transformers';
import { codeBlockTheme } from '../../user-config.js';

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
			transformers: [
				transformerNotationDiff(),
				transformerMetaHighlight(),
				transformerNotationHighlight()
			]
		});
	} else {
		html = highlighter.codeToHtml(code, {
			lang,
			theme: codeBlockTheme,
			transformers: [
				transformerNotationDiff(),
				transformerMetaHighlight(),
				transformerNotationHighlight()
			],
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

function customCodeBlocks(html) {
	return html.replace(
		/<pre\b([^>]*)>/g,
		'<pre$1><button class="copy-code-button" name="copy-code"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="max-w-[1.5rem] max-h-[1.5rem] h-full w-full copy"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 copied hidden"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></button>'
	);
}

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
