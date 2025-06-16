/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- 이 부분을 추가 또는 수정합니다.
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        'nanum-square': ['NanumSquare', 'sans-serif'],
        'nanum-gothic': ['Nanum Gothic', 'sans-serif'],
        'nanum-gothic-coding': ['Nanum Gothic Coding', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};