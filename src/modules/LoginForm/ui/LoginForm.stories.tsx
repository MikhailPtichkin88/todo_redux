import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { IStateSchema } from '@/providers/StoreProvider'
import { DeepPartial } from '@/shared/types/types'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'

const state: DeepPartial<IStateSchema> = {
  auth: {
    isInited: false,
    user: undefined,
  },
}

const meta: Meta<typeof LoginForm> = {
  title: 'modules/LoginForm',
  component: LoginForm,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8003/login',
        method: 'POST',
        status: 200,
        response: {
          data: 'success',
        },
      },
      {
        url: 'http://localhost:8003/user',
        method: 'POST',
        status: 200,
        response: {
          data: 'success',
        },
      },
    ],
  },
}
export default meta

type Story = StoryObj<typeof LoginForm>

const Template = () => {
  return <LoginForm />
}

export const Default: Story = {
  render: () => <Template />,
}
Default.decorators = [StoreDecorator(state)]
