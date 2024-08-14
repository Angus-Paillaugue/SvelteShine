// The primary color used.
// You can use https://javisperez.github.io/tailwindcolorshades/ to generate custom colors
export const tailwindColors = {
  50: 'rgb(255, 249, 237)',
  100: 'rgb(254, 242, 214)',
  200: 'rgb(252, 224, 172)',
  300: 'rgb(249, 201, 120)',
  400: 'rgb(247, 177, 85)',
  500: 'rgb(243, 141, 28)',
  600: 'rgb(228, 115, 18)',
  700: 'rgb(189, 87, 17)',
  800: 'rgb(150, 69, 22)',
  900: 'rgb(121, 58, 21)',
  950: 'rgb(65, 28, 9)'
};

// For a list of available themes, visit https://shiki.matsu.io/themes
// You may also have to change the variable in the src/code.css 8:14
export const codeBlockTheme = 'one-dark-pro';

export const sidebarStyle = 'details'; // "static"|"details" (default: "details")
export const developSidebar = true; // true|false (default: true), Only works with sidebarStyle "details"

// Socials in the navbar (see https://icon-sets.iconify.design) for the icon names
export const socials = [
  {
    name: 'GitHub',
    icon: 'line-md:github-loop',
    url: 'https://github.com/Angus-Paillaugue'
  }
];
// The target pf the socials links
export const socialsTarget = '_blank'; // _blank|_self|_parent|_top|framename

// Site meta config
export const siteName = 'SvelteShine';
export const siteDescription = 'A simple documentation template for SvelteKit';
export const siteAuthor = 'Angus Paillaugue';
export const keywords = 'svelte, sveltekit, documentation, template';

export const homepage = {
  version: {
    showHomepageMessage: true,
    latestVersion: '1.0.0',
    latestVersionURL: '/docs'
  },
  catchphrase: 'Illuminate your Svelte documentation'
};

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
    name: 'Components',
    children: [
      { name: 'Commands' },
      { name: 'Tree' },
      { name: 'Collapsible' },
      { name: 'Note' },
      { name: 'Definition' },
      { name: 'Tooltip' },
      { name: 'Images' },
      { name: 'Api-reference' },
      { name: 'Tables' },
    ]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';
