import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { MapAddressList } from './MapAddressList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { YMaps } from '@pbe/react-yandex-maps'

const addressList = [
  {
    address: 'метро Академическая, Калужско-Рижская линия, Москва, Россия',
    coordinates: [55.68766, 37.573348],
    id: 2,
  },
  {
    address:
      'метро Тимирязевская, Серпуховско-Тимирязевская линия, Москва, Россия',
    coordinates: [55.8187, 37.57528],
    id: 3,
  },
  {
    address: 'Большая Черкизовская улица, Москва, Россия',
    coordinates: [55.798465, 37.729853],
    id: 1,
  },
]

const meta: Meta<typeof MapAddressList> = {
  title: 'modules/MapAddressList',
  component: MapAddressList,
  decorators: [
    (Story: StoryFn) => {
      const queryClient = new QueryClient()
      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <YMaps>
              <Story />
            </YMaps>
          </QueryClientProvider>
        </BrowserRouter>
      )
    },
  ],
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8002/address_list',
        method: 'GET',
        status: 200,
        response: addressList,
      },
      {
        url: 'http://localhost:8002/update-address-list',
        method: 'POST',
        status: 200,
        response: addressList,
      },
    ],
  },
}

export default meta

type Story = StoryObj<typeof MapAddressList>

export const Default: Story = {}
