import { Meta, StoryObj } from '@storybook/react'
import { CardTitle } from '.'

const meta = {
  title: 'CardTitle',
  component: CardTitle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#333333' }],
    },
  },
} satisfies Meta<typeof CardTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Income: Story = { args: { variation: 'income' } }
export const Expenses: Story = { args: { variation: 'expenses' } }
export const Pending: Story = { args: { variation: 'pending' } }
export const Balance: Story = { args: { variation: 'balance' } }
