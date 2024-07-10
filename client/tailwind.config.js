/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vollkorn': ['Vollkorn SC', 'sans-serif']
      },
      backgroundImage: {
        'home-page-bg': "url('@/assets/image/HomeBG.png')",
        'lucian-bg': "url('@/assets/image/Temp/Lucian_bg.jpg')",
        'summoner-page-bg': "url('@/assets/image/SummonerPageBG.jpg')"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
}
