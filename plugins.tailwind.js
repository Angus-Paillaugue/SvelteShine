import plugin from 'tailwindcss/plugin';

export const radialGradientPlugin = plugin(({ matchUtilities, theme }) => {
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

export const hocusPlugin = plugin(({ addVariant }) => {
  // Add hocus utility variant
  addVariant('hocus', ['&:hover', '&:focus']);
});

export const textWrapPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.text-wrap-none': {
      textWrap: 'none'
    },
    '.text-wrap-balance': {
      textWrap: 'balance'
    }
  });
});

export const ligaturesPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.ligatures-normal': {
      fontVariantLigatures: 'normal'
    },
    '.ligatures-none': {
      fontVariantLigatures: 'none'
    }
  });
});
