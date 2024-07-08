import { StoryFn } from '@storybook/react'
import { ProfileAvatar } from './ProfileAvatar'
import { BrowserRouter } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'
import { HTMLProps } from 'react'

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

interface IProps extends HTMLProps<HTMLImageElement> {
  wrapperClassName?: string
  avatarLink: string
  inited: boolean
}

const Template = (args: IProps) => {
  return (
    <div className="p30">
      <ProfileAvatar {...args} />
    </div>
  )
}

export const Authorized: Story = {
  render: (args) => <Template {...args} />,
}
Authorized.args = {
  inited: true,
  avatarLink:
    'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
  width: '80px',
  height: 80,
}

export const Unauthorized: Story = {
  render: (args) => <Template {...args} />,
}
Unauthorized.args = {
  inited: false,
}
