import { StoryFn } from '@storybook/react'
import { HeaderAppBar } from './HeaderAppBar'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/HeaderAppBar',
  component: HeaderAppBar,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

const Template = () => <HeaderAppBar />

export const Default = Template.bind({})
