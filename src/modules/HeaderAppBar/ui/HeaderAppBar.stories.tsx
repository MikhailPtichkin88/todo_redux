import { StoryFn } from '@storybook/react'
import { HeaderAppBar } from './HeaderAppBar'
import { BrowserRouter } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useEffect } from 'react'

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

const Template = () => {
  const { setUserData } = useUserStore()
  useEffect(() => {
    setUserData({
      id: '999',
      username: 'mockUser',
      email: 'mockUser@example.com',
      avatar:
        'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
    })
  }, [])
  return <HeaderAppBar />
}

export const Default = Template.bind({})
