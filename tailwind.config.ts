import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media'
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px', 
      'md': '768px',
      'lg': '1024px',
    },
    extend: {},
  },
  plugins: [],
};
export default config;
