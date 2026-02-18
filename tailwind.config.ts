import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bgMain: 'rgb(var(--bg-main) / <alpha-value>)',
        bgSecondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        borderSubtle: 'rgb(var(--border-subtle) / <alpha-value>)',
        textMain: 'rgb(var(--text-main) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        surfaceDark: 'rgb(var(--surface-dark) / <alpha-value>)',
        borderDark: 'rgb(var(--border-dark) / <alpha-value>)',
        codeBg: 'rgb(var(--code-bg) / <alpha-value>)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
