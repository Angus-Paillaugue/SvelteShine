export const tailwindColors = {
	50: 'rgb(250 250 250)',
	100: 'rgb(245 245 245)',
	200: 'rgb(229 229 229)',
	300: 'rgb(212 212 212)',
	400: 'rgb(163 163 163)',
	500: 'rgb(115 115 115)',
	600: 'rgb(82 82 82)',
	700: 'rgb(64 64 64)',
	800: 'rgb(38 38 38)',
	900: 'rgb(23 23 23)',
	950: 'rgb(10 10 10)'
};

// For a list of available themes, visit https://shiki.matsu.io/themes
export const codeBlockTheme = 'one-dark-pro';

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
		children: [{ name: 'Sort directories' }]
	},
];


export const docsUrlStart = '/docs'
