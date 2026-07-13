export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 40px rgba(94, 160, 255, 0.16)',
      },
      colors: {
        night: '#020617',
        moon: '#111827',
        glow: '#75b1ff',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(96, 165, 250, 0.16), transparent 35%), radial-gradient(circle at 20% 10%, rgba(168, 85, 247, 0.18), transparent 26%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12), transparent 25%), linear-gradient(180deg, #050814 0%, #0b1221 100%)',
      },
    },
  },
  plugins: [],
};
