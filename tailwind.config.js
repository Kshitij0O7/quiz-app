/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    data: {
      checked: 'ui~="checked"',
    },
    extend: {
      backgroundImage: {
        'tsaw': "url(/src/assets/images/tsaw_bgImage.png)"
      },
    colors:{
      "tblu": "#2e5baa", 
      "blue": {
        "500": '#3b82f6', // Change to desired background color
      },
    }
  },
  
  plugins: [],
  }
}
