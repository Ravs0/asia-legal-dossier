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
        },
        terminal: {
          bg: '#000000',
          header: '#1a1a2e',
          sidebar: '#0f0f1a',
          panel: '#16162a',
          panelHover: '#1e1e3a',
          border: '#2a2a4a',
          text: '#e0e0e0',
          textDim: '#6b6b8a',
          amber: '#ff8c00',
          green: '#00ff88',
          red: '#ff3366',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
