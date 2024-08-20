import type { Preview, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import '../src/index.css'
import React from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    // decorators: [
    //   (Story: StoryFn) => (
    //     <BrowserRouter>
    //       <Story />
    //     </BrowserRouter>
    //   ),
    // ],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
