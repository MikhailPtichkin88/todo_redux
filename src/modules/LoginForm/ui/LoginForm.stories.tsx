import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const meta: Meta<typeof LoginForm> = {
  title: 'modules/LoginForm',
  component: LoginForm,
  decorators: [
    (Story: StoryFn) => {
      const queryClient = new QueryClient()
      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </BrowserRouter>
      )
    },
  ],
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8002/login',
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
