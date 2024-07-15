import { Meta, StoryObj } from '@storybook/react'
import { AddressItem } from './AddressItem'

const meta: Meta<typeof AddressItem> = {
  title: 'ui/AddressItem',
  component: AddressItem,
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    onDelete: { action: 'onDelete' },
  },
}

export default meta

type Story = StoryObj<typeof AddressItem>

export const Default: Story = {
  args: {
    id: '1',
    title: 'Большая Черкизовская, Москва, Россия',
    className: 'max-w-[450px]',
    onDelete: () => {},
  },
}

export const Disabled: Story = {
  args: {
    id: '2',
    title: 'Владимирскас область, деревня Липна',
    disabled: true,
    className: 'max-w-[450px]',
    onDelete: () => {},
  },
}
