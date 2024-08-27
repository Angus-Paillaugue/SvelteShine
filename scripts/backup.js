import { version } from '../project.config.js';
import { mkdirSync, cpSync, readdirSync, existsSync, rmSync } from 'fs';
import inquirer from 'inquirer';
import path from 'path';

/**
 * Checks if a new version is newer than a last version.
 *
 * @param {string} lastVersion - The last version to compare.
 * @param {string} newVersion - The new version to compare.
 * @returns {boolean} Returns true if the new version is newer, false otherwise.
 */
function isNewerVersion(lastVersion, newVersion) {
  if (!lastVersion) return true;
  const lastParts = lastVersion.split('.').map(Number);
  const newParts = newVersion.split('.').map(Number);

  for (let i = 0; i < lastParts.length; i++) {
    if (newParts[i] > lastParts[i]) {
      return true;
    } else if (newParts[i] < lastParts[i]) {
      return false;
    }
  }

  return false; // if all parts are equal, the newVersion is not greater
}

async function createBackup() {
  const backupDir = path.join(process.cwd(), 'backup');
  if (existsSync(backupDir)) {
    console.log('Backup directory already exists');
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Do you want to overwrite the existing backup?',
      },
    ]).then((answers) => {
      if (answers.overwrite) {
        rmSync(backupDir, { recursive: true });
      }else {
        process.exit(0);
      }
    });
  }
  try {
    mkdirSync(backupDir);
    console.log('Backup directory created');
  } catch (_) {
    console.log('Backup directory already exists');
  }

  const prohibitedItems = ['.git', 'node_modules', 'backup', '.svelte-kit'];
  const thingsToCopy = readdirSync(process.cwd()).filter((name) => !prohibitedItems.includes(name));
  for (const thing of thingsToCopy) {
    cpSync(thing, path.join(backupDir, thing), { recursive: true });
  }

  console.log('Backup created');
}

(async () => {
  const githubReleasesReq = await fetch(
    'https://api.github.com/repos/Angus-Paillaugue/SvelteShine/tags'
  );
  if (!githubReleasesReq.ok) {
    throw new Error('Failed to fetch github releases');
  }
  const githubReleases = await githubReleasesReq.json();
  const latestGithubReleaseVersion = githubReleases[0].name;
  if (!isNewerVersion(version, latestGithubReleaseVersion)) {
    console.log('No new release found');
    return;
  }else {
    console.log(`New release found : ${version} -> ${latestGithubReleaseVersion}`);
    await createBackup();

    console.log(
      'You can now follow the instructions on https://svelte-shine.paillaugue.fr/docs/Updating to update your project'
    );
  }
})();
