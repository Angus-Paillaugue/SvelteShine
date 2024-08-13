import plugin from 'tailwindcss/plugin';
import { tailwindColors } from './user-config';

const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        // map to bg-radient-[*]
        'bg-radient': (value) => ({
          'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`
        })
      },
      { values: theme('radialGradients') }
    );
  },
  {
    theme: {
      radialGradients: _presets()
    }
  }
);

/**
 * utility class presets
 */
function _presets() {
  const shapes = ['circle', 'ellipse'];
  const pos = {
    c: 'center',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right'
  };
  let result = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

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
        primary: tailwindColors
      },
      textShadow: {
        code: '0 1px rgba(0, 0, 0, 0.3)',
        none: 'none'
      },
      radialGradients: _presets()
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
        },
        {
          // map to bg-radient-[*]
          'bg-radient': (value) => ({
            'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`
          })
        },
        { values: theme('radialGradients') }
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
