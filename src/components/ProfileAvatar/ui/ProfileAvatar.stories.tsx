import { StoryFn } from '@storybook/react'
import { ProfileAvatar } from './ProfileAvatar'
import { BrowserRouter } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProfileAvatar> = {
  title: 'components/ProfileAvatar',
  component: ProfileAvatar,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ProfileAvatar>

const Template = ({ inited }: { inited: boolean }) => {
  return (
    <div className="p30">
      <ProfileAvatar
        avatarLink={
          'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg'
        }
        inited={inited}
      />
    </div>
  )
}

export const Authorized: Story = {
  render: () => <Template inited={true} />,
}

export const Unauthorized: Story = {
  render: () => <Template inited={false} />,
}
