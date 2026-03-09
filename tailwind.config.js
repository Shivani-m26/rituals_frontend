/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFF7F2',
        'cream-dark': '#F5EDE6',
        'pastel-pink': '#F8C8DC',
        'pastel-pink-light': '#FDE4EF',
        'baby-blue': '#CDE7FF',
        'baby-blue-light': '#E5F1FF',
        'mint': '#CFF5E7',
        'mint-light': '#E2FAF0',
        'soft-yellow': '#FFF3B0',
        'soft-yellow-light': '#FFF9D6',
        'coffee': '#8B6A60',
        'coffee-light': '#A68B82',
        'coffee-dark': '#6B4F47',
      },
      fontFamily: {
        'handwritten': ['Caveat', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'journal': '1rem',
        'sticky': '0.25rem',
      },
      boxShadow: {
        'sticky': '2px 3px 8px rgba(139,106,96,0.10), 0 1px 2px rgba(0,0,0,0.04)',
        'sticky-hover': '4px 6px 16px rgba(139,106,96,0.18), 0 2px 4px rgba(0,0,0,0.06)',
        'journal': '0 4px 24px rgba(139,106,96,0.08)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-3deg)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'checkmark': {
          '0%': { transform: 'scale(0) rotate(45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.3) rotate(45deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(45deg)', opacity: '1' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-40px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'checkmark': 'checkmark 0.3s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-out': 'slide-out 0.4s ease-in forwards',
      },
    },
  },
  plugins: [],
}
