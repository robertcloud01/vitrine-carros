/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#0D0D0D',
          graphite: '#1A1A1A',
          gold: '#D4AF37',
          white: '#F8F8F8',
          gray: '#333943',
        },
        gold: {
          50: '#FFFDF7',
          100: '#FEF9E7',
          200: '#FDF2C3',
          300: '#FCE68A',
          400: '#F9D441',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9A7B1A',
          800: '#7F651C',
          900: '#6C541C',
        },
      },
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(0, 0, 0, 0.5)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};