import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { ProfileForm } from './ProfileForm'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { profileSliceReducer } from '../model/slice/profileSlice'

const mockProfileData = {
  id: '1',
  username: 'Alex',
  email: 'example@mail.com',
  avatar:
    'https://preview.redd.it/do-you-like-berserk-but-hate-other-anime-manga-v0-nrmdrm83vdob1.jpg?width=1080&crop=smart&auto=webp&s=8835d50664920c070a517934c8a6addf6cc1e763',
}

const meta: Meta<typeof ProfileForm> = {
  title: 'modules/ProfileForm',
  component: ProfileForm,
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
        url: 'http://localhost:8002/user/1',
        method: 'PATCH',
        status: 200,
        response: {
          data: mockProfileData,
        },
      },
      {
        url: 'http://localhost:8002/user/1',
        method: 'GET',
        status: 200,
        response: mockProfileData,
      },
    ],
  },
}
export default meta

type Story = StoryObj<typeof ProfileForm>

const Template = () => {
  return <ProfileForm />
}

export const Default: Story = {
  render: () => <Template />,
}
Default.decorators = [
  StoreDecorator({
    auth: { user: mockProfileData },
    profile: { isLoading: false, profile: mockProfileData },
  }),
]
