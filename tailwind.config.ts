// import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react"

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      gridTemplateColumns: {
          // Simple 8 row grid
  
          // Complex site-specific row configuration
          'layout':  '200px minmax(900px, 1fr) 100px',
        }
    },
    colors: {
      'encoure': 'rgba(255, 179, 2, 1)',
      'errer': 'rgba(254, 56, 57, 1)',
      'termine': 'rgba(87, 240, 0, 1)',
      'BG': 'rgba(249, 249, 249, 1)',
      'BG-botton': 'rgba(249, 249, 249, 1)',
      'darck': 'rgba(17, 19, 66, 1)',
      'etap': 'rgba(220, 220, 236, 1)',
      'green': 'rgba(13, 198, 0, 1)',
      'input': 'rgba(249, 249, 249, 1)',
      'sub-title': 'rgba(181, 181, 195, 1)',
      'text': 'rgba(96, 96, 96, 1)',
      'text-mini': 'rgba(204, 206, 255, 1)',
      'text-mini-2': 'rgba(204, 204, 204, 1)',
      'WT': 'rgba(255, 255, 255, 1)',
      'table':'#78829D',
      'search':'#F2F2F2',
      'input-1':'#F9F9F9',
      'title':'#96B0C4',
      'filter':'#F1F1F1',
      'border':'#F4F4F4'
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config
