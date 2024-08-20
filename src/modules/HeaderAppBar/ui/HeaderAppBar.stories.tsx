import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { HeaderAppBar } from './HeaderAppBar'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { IStateSchema } from '@/providers/StoreProvider'
import { DeepPartial } from '@/shared/types/types'
import { BrowserRouter } from 'react-router-dom'

const state: DeepPartial<IStateSchema> = {
  auth: {
    isInited: true,
    user: {
      id: '999',
      username: 'mockUser',
      email: 'mockUser@example.com',
      avatar:
        'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
    },
  },
}

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

const Template = () => {
  return <HeaderAppBar />
}

export const Authorized: Story = {
  render: () => <Template />,
}
Authorized.decorators = [StoreDecorator(state)]

export const Unauthorized: Story = {
  render: () => <Template />,
}
Unauthorized.decorators = [StoreDecorator({ auth: { isInited: false } })]
