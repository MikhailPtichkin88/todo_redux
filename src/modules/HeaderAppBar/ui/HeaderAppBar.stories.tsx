import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { HeaderAppBar } from './HeaderAppBar'
import { BrowserRouter } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useEffect } from 'react'

const meta: Meta<typeof HeaderAppBar> = {
  title: 'modules/HeaderAppBar',
  component: HeaderAppBar,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof HeaderAppBar>

const Template = ({ isAuthed }: { isAuthed?: boolean }) => {
  const { setUserData, logout } = useUserStore()

  useEffect(() => {
    if (isAuthed) {
      setUserData({
        id: '999',
        username: 'mockUser',
        email: 'mockUser@example.com',
        avatar:
          'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
      })
    } else {
      logout()
    }
  }, [isAuthed])

  return <HeaderAppBar />
}

export const Authorized: Story = {
  render: () => <Template isAuthed={true} />,
}

export const Unauthorized: Story = {
  render: () => <Template />,
}
