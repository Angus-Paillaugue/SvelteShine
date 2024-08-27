import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const changeLogFilePath = path.resolve(__dirname, '../src/routes/(home)/releases/releases.json');
const changeLogFile = JSON.parse(readFileSync(changeLogFilePath, 'utf-8'));
const lastRelease = changeLogFile.at(-1);

/**
 * Checks if a release object is valid.
 *
 * @param {Object} release - The release object to be checked.
 * @throws {Error} If the version property is missing.
 * @throws {Error} If the description property is missing.
 */
function checkRelease(release) {
  if(!release.version) {
    throw new Error('Version is required');
  }
  if (!release.description) {
    throw new Error('A description is required');
  }
}

/**
 * Checks if a new version is newer than a last version.
 *
 * @param {string} lastVersion - The last version to compare.
 * @param {string} newVersion - The new version to compare.
 * @returns {boolean} Returns true if the new version is newer, false otherwise.
 */
function isNewerVersion(lastVersion, newVersion) {
  if(!lastVersion) return true;
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

/**
 * Creates a new release.
 *
 * @param {Object} release - The release object.
 * @param {string} release.version - The version of the release.
 * @param {string} [release.date] - The date of the release. If not provided, the current date will be used.
 * @throws {Error} If the new version is not greater than the last one.
 */
function createNewRelease(release) {
  checkRelease(release);

  if (!release.date) {
    release.date = new Date().toUTCString();
  }

  if (!isNewerVersion(lastRelease?.version, release.version)) {
    throw new Error('New version must be greater than the last one');
  }
  changeLogFile.push(release);

  writeFileSync(changeLogFilePath, JSON.stringify(changeLogFile, null, 2));
}

(async() => {
  // Ask for the new release information
  const release = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Version',
      validate: (input) => {
        if (!input) {
          return 'A version is required';
        }
        if (!/^v\d+\.\d+\.\d+$/.test(input)) {
          return 'Version must be in the format vx.x.x';
        }
        if (!isNewerVersion(lastRelease?.version, input)) {
          return 'New version must be greater than the last one';
        }
         return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      validate: (input) => {
        if (!input) {
          return 'A description is required';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'date',
      message: 'Date',
      default: new Date().toUTCString()
    },
  ]);

  // Create the new release and save it to the src/routes/releases/releases.json file
  createNewRelease(release);

  console.log("\n" + chalk.green('✓ ') + release.version + ' Release created');
})()
