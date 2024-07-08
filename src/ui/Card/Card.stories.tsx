import { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'
import { ReactNode } from 'react'
import { Button } from '../Button'
import { Check } from 'lucide-react'

const meta: Meta<typeof Card> = {
  title: 'ui/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

const Template = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return <Card className={className}>{children}</Card>
}

export const Default: Story = {
  render: () => (
    <Template className="w-[300px]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        Card content
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Content point title
            </p>
            <p className="text-sm text-muted-foreground">
              Content point description
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Template>
  ),
}
