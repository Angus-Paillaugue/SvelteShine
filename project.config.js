// Colors config
export const colors = {
  // The primary color used.
  // You can use https://javisperez.github.io/tailwindcolorshades/ to generate custom colors
  tailwindColors: {
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
  },
  // For a list of available themes, visit https://shiki.matsu.io/themes
  // You may also have to change the variable in the src/code.css 8:14
  codeBlockTheme: 'one-dark-pro'
};

// Sidebar config
export const sideBar = {
  style: 'details', // "static"|"details" (default: "details")
  develop: true, // true|false (default: true), Only works with sidebarStyle "details"
  socials: {
    target: '_blank', // _blank|_self|_parent|_top|framename
    list: [
      {
        name: 'GitHub',
        icon: 'line-md:github-loop',
        url: 'https://github.com/Angus-Paillaugue/SvelteShine'
      }
    ]
  }
};

// project meta config
export const project = {
  name: 'Project name',
  description: 'Project description',
  author: 'Angus Paillaugue',
  keywords: 'svelte, sveltekit, documentation, template',
  domain: 'https://svelte-shine.paillaugue.fr'
};

// All of your docs pages
// You can add, sort, and nest pages here
// The name is the text that will appear in the sidebar
// If you add a markdown page but don't add it here, it won't appear in the sidebar
export const pages = [
  {
    name: 'Quickstart',
    icon: {
      name: 'material-symbols:home-outline-rounded'
    }
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';


// DO NOT CHANGE MANUALLY
export const version = 'v0.0.1';
