import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { UserAvatar } from './UserAvatar'
import { HTMLProps } from 'react'

const meta: Meta<typeof UserAvatar> = {
  title: 'ui/UserAvatar',
  component: UserAvatar,
  decorators: [
    (Story: StoryFn) => {
      return (
        <div className="w-[300px]">
          <Story />
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof UserAvatar>

const Template = ({
  avatarLink,
  ...args
}: HTMLProps<HTMLImageElement> & { avatarLink: string }) => {
  return <UserAvatar avatarLink={avatarLink} {...args} />
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}
Default.args = {
  avatarLink:
    'https://preview.redd.it/do-you-like-berserk-but-hate-other-anime-manga-v0-nrmdrm83vdob1.jpg?width=1080&crop=smart&auto=webp&s=8835d50664920c070a517934c8a6addf6cc1e763',
  width: 50,
  height: 50,
}
