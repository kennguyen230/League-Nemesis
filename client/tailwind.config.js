/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{ts,tsx,html}',
  './index.html', // Ensure the root HTML file is scanned
  './node_modules/@shadcn/ui/**/*.js'
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    fontFamily: {
      'vollkorn': ['Vollkorn SC', 'sans-serif'],
      'vollkorn-para': ['Vollkorn', 'sans-serif']
    },
    backgroundImage: {
      'home-page-bg': "url('@/assets/image/HomeBG.jpg')",
      'summoner-page-bg': "url('@/assets/image/SummonerPageBG.jpg')"
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const plugins = [
  require("tailwindcss-animate"),
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
];
