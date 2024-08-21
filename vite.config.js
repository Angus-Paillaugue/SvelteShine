import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import { docsUrlStart } from './project.config.js';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        docsUrlStart
      ]
    }
  },
  resolve: {
    alias: {
      $conf: path.resolve(__dirname, './project.config.js')
    }
  }
});
