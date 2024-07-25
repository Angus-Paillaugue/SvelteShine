import plugin from 'tailwindcss/plugin';
import { tailwindColors } from './user-config';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,md}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins'],
				mono: ['JetBrains Mono']
			},
			colors: {
				primary: tailwindColors
			},
			textShadow: {
				code: '0 1px rgba(0, 0, 0, 0.3)',
				none: 'none'
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, addUtilities, theme }) {
			// Add text-shadow utilities
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value
					})
				},
				{
					values: theme('textShadow')
				}
			),
				addUtilities({
					// Add font-ligatures utilities
					'.ligatures-normal': {
						fontVariantLigatures: 'normal'
					},
					'.ligatures-none': {
						fontVariantLigatures: 'none'
					},
					// Add text-wrap utilities
					'.text-wrap-none': {
						textWrap: 'none'
					},
					'.text-wrap-balance': {
						textWrap: 'balance'
					}
				});
		})
	],
	darkMode: 'class'
};
