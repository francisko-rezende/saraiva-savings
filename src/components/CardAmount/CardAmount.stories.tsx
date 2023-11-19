import { Meta, StoryObj } from '@storybook/react'
import { CardAmount } from '.'

const meta = {
  title: 'CardAmount',
  component: CardAmount,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardAmount>

export default meta

type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { amount: 100 } }
export const Negative: Story = { args: { amount: -100 } }
