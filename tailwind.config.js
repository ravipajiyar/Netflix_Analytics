/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          DEFAULT: '#e50914',
          soft: '#ff3d4d',
        },
        ink: {
          950: '#07070b',
          900: '#0b0b11',
          850: '#101018',
          800: '#15151f',
          700: '#1d1d29',
          600: '#262635',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 30px 70px -40px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        'glow-red': '0 0 45px -12px rgba(229, 9, 20, 0.65)',
        'glow-soft': '0 12px 40px -18px rgba(229, 9, 20, 0.5)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #ff3d4d 0%, #e50914 55%, #9f1239 100%)',
        'card-sheen': 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 45%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
