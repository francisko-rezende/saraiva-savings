import { Meta, StoryObj } from '@storybook/react'
import { SelectFilter } from '.'

const meta = {
  title: 'SelectFilter',
  component: SelectFilter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SelectFilter>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
