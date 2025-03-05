import { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
        integralCF: ['var(--font-integralcf)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
