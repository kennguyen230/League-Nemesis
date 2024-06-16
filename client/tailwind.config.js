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
        'home-page-bg': "url('src/assets/image/HomeBG.png')",
        'lucian-bg': "url('src/assets/image/Temp/Lucian_bg.jpg')",
        'summoner-page-bg': "url('src/assets/image/SummonerPageBG.jpg')"
      }
    },
  },
  plugins: [],
}
