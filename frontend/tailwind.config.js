/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Las fotos guardan su proporción como clase de Tailwind
    './src/content/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F4F5F1',
        ink: '#0F1115',
        calipso: { DEFAULT: '#1FC4D4', deep: '#00798A', shade: '#0B4A55' },
        marker: '#FFD60A',
        rule: '#D5D8D2',
        dim: '#575C66',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
