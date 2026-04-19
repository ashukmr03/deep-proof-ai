/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#7c3aed',
          blue: '#3b82f6',
          pink: '#ec4899',
        },
        dark: {
          900: '#050510',
          800: '#0a0a1f',
          700: '#0f0f2d',
          600: '#14143c',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        glitch: 'glitch 0.5s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,245,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,245,255,0.8), 0 0 60px rgba(0,245,255,0.4)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(3px, -3px)', filter: 'hue-rotate(180deg)' },
          '60%': { transform: 'translate(-3px, 0)', filter: 'hue-rotate(270deg)' },
          '80%': { transform: 'translate(3px, 3px)', filter: 'hue-rotate(360deg)' },
          '100%': { transform: 'translate(0)', filter: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        neon: '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.1)',
        'neon-purple': '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
