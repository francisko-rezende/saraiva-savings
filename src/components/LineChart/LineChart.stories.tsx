import { Meta, StoryObj } from '@storybook/react'
import { LineChart } from '.'

const meta = {
  title: 'LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LineChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
