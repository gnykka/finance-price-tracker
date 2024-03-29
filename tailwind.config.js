/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    spacing: {
      px: '1px',
      0: '0px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
    },
    fontSize: {
      inherit: 'inherit',
      'base-sm': '14px',
      'base-md': '16px',
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      md: '1.25rem',
      lg: '2rem',
      xl: '2.5rem',
    },
    lineHeight: {
      inherit: 'inherit',
      none: 0,
      base: 1,
      1: 1.15,
      2: 1.3,
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      green: {
        100: '#E6F4EA',
        800: '#1D7D4F',
      },
      red: {
        100: '#FDEDEA',
        800: '#BB4136',
      },
      gray: {
        900: '#121212',
        800: '#252525',
        700: '#3B3B3B',
        600: '#666666',
        500: '#929292',
        400: '#BEBEBE',
        300: '#D3D3D3',
        200: '#E9E9E9',
        100: '#F4F4F4',
      },
      accent: {
        900: '#1C4d7A',
        800: '#2767A1',
        700: '#307EC6',
        600: '#3996ED',
        500: '#5BA9F1',
        400: '#7FBBF4',
        300: '#A3D0F8',
        200: '#C9E2FB',
        100: '#F0F7FF',
      },
    },
    borderRadius: {
      none: '0px',
      DEFAULT: '0.5rem',
    },
  },
  plugins: [],
}

