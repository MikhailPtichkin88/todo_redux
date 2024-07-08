import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { ProfileForm } from './ProfileForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProfileStore } from '../store/useProfileStore'
import { useEffect } from 'react'
import { useUserStore } from '@/modules/HeaderAppBar'

const meta: Meta<typeof ProfileForm> = {
  title: 'modules/ProfileForm',
  component: ProfileForm,
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
        url: 'http://localhost:8002/user',
        method: 'PATCH',
        status: 200,
        response: {
          data: 'success',
        },
      },
    ],
  },
}
export default meta

const mockProfileData = {
  id: '1',
  username: 'Alex',
  email: 'example@mail.com',
  avatar:
    'https://preview.redd.it/do-you-like-berserk-but-hate-other-anime-manga-v0-nrmdrm83vdob1.jpg?width=1080&crop=smart&auto=webp&s=8835d50664920c070a517934c8a6addf6cc1e763',
}

type Story = StoryObj<typeof ProfileForm>

const Template = () => {
  const { setProfileData } = useProfileStore()
  const { setUserData } = useUserStore()

  useEffect(() => {
    setUserData(mockProfileData)
    setProfileData(mockProfileData)
  }, [])

  return <ProfileForm />
}

export const Default: Story = {
  render: () => <Template />,
}
