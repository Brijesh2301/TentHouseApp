/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ee',
          100: '#f9f0cc',
          200: '#f2dd8d',
          300: '#ecc848',
          400: '#e5b422',
          500: '#D4AF37',
          600: '#b8901f',
          700: '#926d1b',
          800: '#78561e',
          900: '#65461e',
        },
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#8B5E3C',
          900: '#6b4423',
        },
        cream: '#FDF8F3',
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #8B5E3C 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2C2C2C 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
