import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>

const Template = (args: ButtonProps) => {
  return <Button {...args}>Button</Button>
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}
Default.argTypes = {
  variant: {
    options: ['default', 'secondary', 'outline'],
    control: { type: 'radio' },
  },
  size: {
    options: ['default', 'sm', 'lg'],
    control: { type: 'select' },
  },
}
Default.args = {
  disabled: false,
}

export const Destructive: Story = {
  render: (args) => <Template {...args} />,
}

Destructive.argTypes = {
  variant: {
    options: ['destructive', 'ghost', 'link'],
    control: { type: 'radio' },
  },
  size: {
    options: ['default', 'sm', 'lg'],
    control: { type: 'select' },
  },
}
Destructive.args = {
  variant: 'destructive',
  disabled: false,
}

export const Ghost: Story = {
  render: () => <Template variant={'ghost'} />,
}

export const LinkDisabled: Story = {
  render: (args) => <Template variant={'link'} {...args} />,
}
LinkDisabled.args = {
  disabled: true,
}
