import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        rightToLeft: {
          '0%': { transform: 'translateX(105%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fromBottom: {
          '0%': { transform: 'translateY(100px)' },
          '100%': { transform: 'translateY(0)' },
        },
        opacityMy: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      colors: {
        spaceGray: {
          "400": "#293348",
          "450": "#222c3d",
          "500": "#1F2937",
          "550": "#1a242f",
          "650": "#17202a",
          "700": "#141d25"
        },
        gray: {
          "750": "#313a49"
        },
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#0070f3", // Новый основной цвет, например, красивый синий
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        }
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ],
}

export default config
