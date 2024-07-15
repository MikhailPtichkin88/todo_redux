import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { AddressList } from './AddressList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { IAddressItem } from '@/modules/MapAddressList'

const addressList = [
  {
    address: 'метро Академическая, Калужско-Рижская линия, Москва, Россия',
    coordinates: [55.68766, 37.573348],
    id: '2',
  },
  {
    address:
      'метро Тимирязевская, Серпуховско-Тимирязевская линия, Москва, Россия',
    coordinates: [55.8187, 37.57528],
    id: '3',
  },
  {
    address: 'Большая Черкизовская улица, Москва, Россия',
    coordinates: [55.798465, 37.729853],
    id: '1',
  },
] as IAddressItem[]

const meta: Meta<typeof AddressList> = {
  title: 'components/AddressList',
  component: AddressList,
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
        url: 'http://localhost:8002/update-address-list',
        method: 'POST',
        status: 200,
        response: addressList,
      },
      {
        url: 'http://localhost:8002/address_list',
        method: 'DELETE',
        status: 200,
        response: addressList,
      },
    ],
  },
  argTypes: {
    isFetching: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof AddressList>

export const Default: Story = {
  args: {
    addressList,
    className: 'w-[600px]',
  },
}
export const Disabled: Story = {
  args: {
    addressList,
    className: 'w-[600px]',
    isFetching: true,
  },
}
