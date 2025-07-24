/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // 다크 테마를 위한 새로운 색상 팔레트
        'v4-bg': '#0f0f0f',           // 매우 어두운 배경
        'v4-surface': '#1a1a1a',      // 카드/섹션 배경 (약간 밝은 어두운 회색)
        'v4-text': '#f0f0f0',         // 기본 텍스트 (밝은 회색)
        'v4-text-muted': '#a0a0a0',   // 보조 텍스트 (중간 회색)
        'v4-gold': '#FFD700',         // 강조색 (밝은 금색)
        'v4-blue': '#3b82f6',         // 보조 강조색 (밝은 파란색)
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.02em',
      },
      animation: {
        'typing': 'reveal-char 0.1s steps(1) forwards',
        'marquee-vertical': 'marquee-vertical 30s linear infinite',
      },
      keyframes: {
        'reveal-char': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'marquee-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}