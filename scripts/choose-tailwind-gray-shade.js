import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export async function chooseTailwindGrayShade(newShade) {
  const baseShade = 'neutral';
  for await (const filePath of walk('src')) {
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
