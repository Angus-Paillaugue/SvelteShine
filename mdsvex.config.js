import rehypeSlug from 'rehype-slug';
import highlighter from './src/lib/codeHighlighter.js';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkAttr from 'remark-attr';
import emoji from 'remark-emoji';

const config = {
  extensions: ['.md', '.svx', '.mdx'],
  remarkPlugins: [remarkMath, remarkAttr],
  rehypePlugins: [rehypeKatexSvelte, rehypeSlug, [emoji, { accessible: true }]],
  highlight: {
    highlighter
  },
  layout: './src/lib/components/markdown/blueprint.svelte',
  smartypants: false
};

export default config;
