import { codeBlockTheme } from '../user-config.js';
import fs from 'fs';
import chalk from 'chalk';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function throwError(color) {
  console.error(
    chalk.red('✖') +
      ` Error in updating ${color}.\nYou will need to manually update the inline code background color in the src/code.css file.`
  );
}

export async function main() {
  const theme = await import(`../node_modules/shiki/dist/themes/${codeBlockTheme}.mjs`);

  try {
    const inlineCodeBg = theme.default.colors['editor.background'];
    if (!inlineCodeBg) throw new Error('No inline code background color found');
    let codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
    codeCSSFile = codeCSSFile.replace(
      /--inline-code-bg: .+;/,
      `--inline-code-bg: ${inlineCodeBg};`
    );

    fs.writeFileSync(`./src/code.css`, codeCSSFile);
  } catch (_) {
    throwError('code block background color');
  }

  try {
    const lineRemovedBg = hexToRgb(
      theme.default.tokenColors.find((color) => color.scope === 'markup.deleted.diff').settings
        .foreground
    );
    let codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
    codeCSSFile = codeCSSFile.replace(
      /--line-removed-bg: .+;/,
      `--line-removed-bg: ${lineRemovedBg};`
    );

    fs.writeFileSync(`./src/code.css`, codeCSSFile);
  } catch (_) {
    throwError('line removed background color');
  }

  try {
    const lineAddedBg = hexToRgb(
      theme.default.tokenColors.find((color) => color.scope === 'markup.inserted.diff').settings
        .foreground
    );
    let codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
    codeCSSFile = codeCSSFile.replace(/--line-added-bg: .+;/, `--line-added-bg: ${lineAddedBg};`);

    fs.writeFileSync(`./src/code.css`, codeCSSFile);
  } catch (_) {
    throwError('line added background color');
  }

  try {
    const lineHighlightedBg = hexToRgb(
      theme.default.colors['editor.findMatchHighlightBackground']?.slice(0, 7)
    );
    if (!lineHighlightedBg) throw new Error('No line highlighted background color found');
    let codeCSSFile = fs.readFileSync(`./src/code.css`, 'utf8');
    codeCSSFile = codeCSSFile.replace(
      /--line-highlighted-bg: .+;/,
      `--line-highlighted-bg: ${lineHighlightedBg};`
    );

    fs.writeFileSync(`./src/code.css`, codeCSSFile);
  } catch (_) {
    throwError('line highlighted background color');
  }

  console.log(chalk.green('✓ ') + 'Set theme colors !');
}
