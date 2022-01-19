module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: '#ffc21c',
        purple: {
          light: {
            background: '#432d76',
            opacity: 0.7,
          },
          dark: '#470862',
        },
        gray: {
          light: '#313033',
          dark: '#1f1f1f',
        },
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
