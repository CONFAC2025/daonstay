/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'v4-bg': '#f1f5f9',           // 배경 (옅은 슬레이트 그레이)
        'v4-surface': '#ffffff',      // 카드 배경 (흰색)
        'v4-text': '#334155',         // 기본 텍스트 (차콜 그레이)
        'v4-text-muted': '#64748b',   // 보조 텍스트
        'v4-gold': '#c09a58',         // 포인트 (럭스 골드)
        'v4-blue': '#1e3a8a',         // 보조 포인트 (딥 블루)
      },
      animation: {
        'fade-in-up-slow': 'fade-in-up-slow 1s ease-out forwards',
        'scale-up-subtle': 'scale-up-subtle 0.3s ease-out',
      },
      keyframes: {
        'fade-in-up-slow': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-up-subtle': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}