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
        url: 'https://github.com/Angus-Paillaugue'
      }
    ]
  }
};

// project meta config
export const project = {
  name: 'SvelteShine',
  description: 'A simple documentation template for SvelteKit',
  author: 'Angus Paillaugue',
  keywords: 'svelte, sveltekit, documentation, template'
};

// Homepage config
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
    name: 'Quickstart',
    icon: {
      name: 'material-symbols:rocket-rounded',
      class: 'rotate-45'
    }
  },
  {
    name: 'Configuration',
    children: [
      {
        name: 'Pages',
        icon: 'mdi:file'
      },
      {
        name: 'Colors',
        icon: 'material-symbols:colors-rounded'
      },
      {
        name: 'Sidebar',
        icon: 'material-symbols:side-navigation'
      },
      {
        name: 'Project',
        icon: 'material-symbols:deployed-code-sharp'
      },
      {
        name: 'Homepage',
        icon: 'material-symbols:home-rounded'
      }
    ]
  },
  {
    name: 'Pages',
    children: [
      {
        name: 'Create a page',
        icon: 'material-symbols:news-rounded'
      },
      {
        name: 'Code blocks',
        icon: 'material-symbols:code-blocks-rounded'
      }
    ]
  },
  {
    name: 'Components',
    children: [
      { name: 'Commands', icon: 'material-symbols:terminal-rounded' },
      { name: 'Tree', icon: 'material-symbols:account-tree-rounded' },
      { name: 'Collapsible', icon: 'tabler:layout-bottombar-collapse-filled' },
      { name: 'Dropdown', icon: 'material-symbols:arrow-drop-down-circle-rounded' },
      { name: 'Note', icon: 'material-symbols:sticky-note-2-rounded' },
      { name: 'Definition', icon: 'material-symbols:text-snippet-rounded' },
      { name: 'Tooltip', icon: 'material-symbols:tooltip-rounded' },
      { name: 'Images', icon: 'material-symbols:imagesmode' },
      { name: 'Api-reference', icon: 'mdi:api' },
      { name: 'Tables', icon: 'material-symbols:table-rows-narrow' },
      { name: 'ComponentPreview', icon: 'iconamoon:component-fill' },
      { name: 'Steps', icon: 'material-symbols:steppers' }
    ]
  }
];

// The root path of the markdown files.
// Do not change unless you know what you are doing
export const docsUrlStart = '/docs';
