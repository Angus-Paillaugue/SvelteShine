import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Asynchronously walks through a directory and yields the paths of all files.
 * @param {string} dir - The directory path to walk through.
 * @returns {AsyncGenerator<string>} - An async generator that yields the paths of all files in the directory.
 */
async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

/**
 * Updates the colors in the files located in the './' directory by replacing the base shade with a new shade.
 *
 * @param {string} newShade - The new shade to replace the base shade with.
 * @returns {Promise<void>} - A promise that resolves once the colors have been updated.
 */
export async function chooseTailwindGrayShade(newShade) {
  const baseShade = 'neutral';
  for await (const filePath of walk('./')) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const newFileContents = fileContents.replace(
      new RegExp(`\\b(${baseShade}-\\d{1,3})\\b`, 'g'),
      function (match) {
        return match.replace(baseShade, newShade);
      }
    );

    fs.writeFileSync(filePath, newFileContents);
  }

  console.log(chalk.green('✓ ') + 'Updated colors to ' + chalk.bold(newShade));
}
