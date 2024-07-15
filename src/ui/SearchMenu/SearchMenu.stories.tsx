import { Meta, StoryObj } from '@storybook/react'
import { Combobox as SearchMenu } from './Combobox'

const meta: Meta<typeof SearchMenu> = {
  title: 'ui/SearchMenu',
  component: SearchMenu,
  argTypes: {
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof SearchMenu>

export const Default: Story = {
  args: {
    options: [
      { label: 'Горьковская железная дорога, Россия', value: '1' },
      { label: 'Большая Черкизовская улица, Москва, Россия', value: '2' },
      { label: 'Владимир, Россия', value: '3' },
    ],
    className: 'w-[400px]',
  },
}
