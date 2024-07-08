import { Meta, StoryFn, StoryObj } from '@storybook/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'ui/Checkbox',
  component: Checkbox,
}

export default meta

type Story = StoryObj<typeof Checkbox>

const Template = (
  args: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    className: string
  }
) => {
  return <Checkbox {...args} />
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}

Default.decorators = [
  (Story: StoryFn) => (
    <div className="flex items-center space-x-2">
      <Story id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Label title text example
      </label>
    </div>
  ),
]

export const WithText: Story = {
  render: (args) => <Template {...args} />,
}

WithText.decorators = [
  (Story: StoryFn) => (
    <div className="items-top flex space-x-2">
      <Story id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Label title text example
        </label>
        <p className="text-sm text-muted-foreground">
          description text example
        </p>
      </div>
    </div>
  ),
]

export const Disabled: Story = {
  render: (args) => <Template {...args} disabled />,
}
Disabled.decorators = [
  (Story: StoryFn) => (
    <div className="flex items-center space-x-2">
      <Story id="terms2" />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
]
