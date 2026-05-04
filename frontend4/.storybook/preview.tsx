import '../app/globals.css'
import type { Preview } from '@storybook/nextjs-vite'
import { themes } from 'storybook/theming'
import { Josefin_Sans, Nunito_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    },

    backgrounds: {
      default: 'app',
      options: {
        app: { name: 'App background', value: 'var(--background)' },
        surface: { name: 'App surface', value: 'var(--surface)' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },

    docs: {
      theme: themes.dark,
    },
  },

  initialGlobals: {
    backgrounds: { value: 'app' },
  },

  decorators: [
    (Story) => (
      <div className={`${josefin.variable} ${nunito.variable}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview
