/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dossier: {
          bg: '#0a0f1a',
          panel: '#111827',
          panelHover: '#1a2235',
          border: '#1e293b',
          accent: '#10b981',
          accentDim: '#065f46',
          warning: '#f59e0b',
          warningDim: '#78350f',
          info: '#38bdf8',
          infoDim: '#0c4a6e',
          text: '#e2e8f0',
          textDim: '#64748b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
