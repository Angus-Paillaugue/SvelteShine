export async function load() {
  const SvelteComponents = await import('./SvelteComponents.md');
  const CodeBlock = await import('./CodeBlock.md');

  return {
    markdownPreview: {
      SvelteComponents: SvelteComponents.default,
      CodeBlock: CodeBlock.default
    }
  };
}
