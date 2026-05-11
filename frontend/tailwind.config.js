/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          elev: 'var(--surface-elev)',
        },
        hairline: {
          DEFAULT: 'var(--hairline)',
          strong: 'var(--hairline-strong)',
        },
        ink: 'var(--text)',
        'ink-2': 'var(--text-2)',
        'ink-3': 'var(--text-3)',
        'bubble-in': 'var(--bubble-in)',
        'bubble-in-text': 'var(--bubble-in-text)',
      },
      borderRadius: {
        app: 'var(--radius)',
        'app-lg': 'var(--radius-lg)',
        'app-sm': 'var(--radius-sm)',
        bubble: 'var(--bubble-radius)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%,-1%,0) scale(1.05)' },
          '100%': { transform: 'translate3d(-2%,2%,0) scale(1.02)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.2s cubic-bezier(0.2,0.8,0.2,1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.2,0.8,0.2,1)',
        'fade-in': 'fade-in 0.5s ease',
        'typing-dot': 'typing-dot 1.2s infinite',
        drift: 'drift 28s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
