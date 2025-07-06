/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vietnamese-red': '#DA020E',
        'vietnamese-gold': '#FFCD00',
        'vietnamese-brown': '#8B4513',
        'board-light': '#F5DEB3',
        'board-dark': '#D2B48C',
        'palace-bg': '#FFE4B5'
      },
      fontFamily: {
        'vietnamese': ['Noto Sans Vietnamese', 'sans-serif'],
      },
      animation: {
        'piece-move': 'pieceMove 0.3s ease-in-out',
        'piece-capture': 'pieceCapture 0.4s ease-in-out',
        'check-warning': 'checkWarning 1s ease-in-out infinite',
      },
      keyframes: {
        pieceMove: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        pieceCapture: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.5' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
        },
        checkWarning: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' }
        }
      }
    },
  },
  plugins: [],
}