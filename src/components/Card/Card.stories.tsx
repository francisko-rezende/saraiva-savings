import { Meta, StoryObj } from '@storybook/react'
import { Card } from '.'

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Income: Story = { args: { variation: 'balance', value: 100 } }
export const Expenses: Story = { args: { variation: 'expenses', value: -100 } }
export const Pending: Story = { args: { variation: 'pending', value: 100 } }
export const Balance: Story = { args: { variation: 'balance', value: 100 } }
