/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: ['hover', 'focus'],
      backgroundImage: {
        'tsaw': "url(/src/assets/images/tsaw_bgImage.png)"
      },
  },
  plugins: [],
  }
}
