export const tailwindColors = {
  // 50: 'rgb(250 250 250)',
  // 100: 'rgb(245 245 245)',
  // 200: 'rgb(229 229 229)',
  // 300: 'rgb(212 212 212)',
  // 400: 'rgb(163 163 163)',
  // 500: 'rgb(115 115 115)',
  // 600: 'rgb(82 82 82)',
  // 700: 'rgb(64 64 64)',
  // 800: 'rgb(38 38 38)',
  // 900: 'rgb(23 23 23)',
  // 950: 'rgb(10 10 10)'
  50: 'rgb(255, 248, 242)',
  100: 'rgb(255, 241, 230)',
  200: 'rgb(255, 216, 191)',
  300: 'rgb(255, 184, 153)',
  400: 'rgb(255, 103, 77)',
  500: 'rgb(255, 0, 0)',
  600: 'rgb(230, 0, 0)',
  700: 'rgb(191, 0, 0)',
  800: 'rgb(153, 0, 0)',
  900: 'rgb(115, 0, 0)',
  950: 'rgb(74, 0, 0)'
};

// For a list of available themes, visit https://shiki.matsu.io/themes
// You may also have to change the variable in the src/code.css 8:14
export const codeBlockTheme = 'one-dark-pro';

// Socials in the navbar
export const socials = {
  GitHub: 'https://github.com/Angus-Paillaugue'
};

// Site meta config
export const siteName = 'Doc-template';
export const siteDescription = 'A simple documentation template for SvelteKit';
export const siteAuthor = 'Angus Paillaugue';
export const keywords = 'svelte, sveltekit, documentation, template';

// All of your docs pages
// You can add, sort, and nest pages here
// The name is the text that will appear in the sidebar
// If you add a markdown page but don't add it here, it won't appear in the sidebar
export const pages = [
  {
    name: 'Home'
  },
  {
    name: 'Pages',
    children: [
      {
        name: 'Create a page'
      },
      {
        name: 'Code blocks'
      }
    ]
  },
  {
    name: 'Configuration',
    children: [{ name: 'Colors' }]
  },
  {
    name: 'Directories',
    children: [{ name: 'Sort Directories' }]
  },
  {
    name: 'Components',
    children: [{ name: 'Commands' }, { name: 'Tooltip' }, { name: 'Tree' }, { name: 'Definition' }]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';
