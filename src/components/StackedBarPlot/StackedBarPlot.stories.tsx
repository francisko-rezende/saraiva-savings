import { Meta, StoryObj } from '@storybook/react'
import { StackedBarPlot } from '.'

const meta = {
  title: 'StackedBarPlot',
  component: StackedBarPlot,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StackedBarPlot>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
