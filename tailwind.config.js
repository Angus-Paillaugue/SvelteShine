import plugin from 'tailwindcss/plugin';
import { tailwindColors } from './user-config';

const radialGradientPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      // map to bg-radient-[*]
      'bg-radient': (value) => ({
        'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`
      })
    },
    { values: theme('radialGradients') }
  );
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}', './docs/**/*.{md,svelte,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
        mono: ['JetBrains Mono']
      },
      colors: {
        primary: tailwindColors,
        'text-body': {
          DEFAULT: 'theme(colors.neutral.500)',
          dark: 'theme(colors.neutral.400)'
        },
        'text-heading': {
          DEFAULT: 'theme(colors.neutral.900)',
          dark: 'theme(colors.neutral.100)'
        },
        body: {
          DEFAULT: 'theme(colors.white)',
          dark: 'theme(colors.neutral.900)'
        }
      },
      textShadow: {
        code: '0 1px rgba(0, 0, 0, 0.3)',
        none: 'none'
      },
      borderColor: {
        main: {
          DEFAULT: 'theme(colors.neutral.300/50)',
          dark: 'theme(colors.neutral.700/50)'
        }
      }
    }
  },
  plugins: [
    radialGradientPlugin,
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
