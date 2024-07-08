import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Input, LabeledInput } from './Input'

const meta: Meta<typeof Input> = {
  title: 'ui/Input',
  component: Input,
  decorators: [
    (Story: StoryFn) => {
      return (
        <div className="w-[300px]">
          <Story />
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Input>

const Template = (args: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <Input {...args} />
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}

Default.args = {
  disabled: false,
  placeholder: 'Enter email',
}

export const Disabled: Story = {
  render: (args) => <Template {...args} placeholder="Disabled" />,
}
Disabled.args = {
  disabled: true,
}

export const WithLabel: Story = {
  render: (
    args: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
  ) => <LabeledInput {...args} />,
}
WithLabel.args = {
  label: 'Email',
  placeholder: 'Enter email',
  disabled: false,
} as React.InputHTMLAttributes<HTMLInputElement> & { label: string }
