import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '.'
// import { FiltersProvider } from '../FiltersContext/FiltersContext'

const meta = {
  title: 'DatePicker',
  component: () => <DatePicker />,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
