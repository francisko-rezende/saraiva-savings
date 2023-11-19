import { render, screen } from '@testing-library/react'

import { SelectFilter } from '.'
import { mockData } from '@/data/mockData'
import { renderWithUser } from '@/utils/tests/helpers'

describe('<SelectFilter />', () => {
  it('should display a placeholder text prompting user to filter by industry', () => {
    render(<SelectFilter />)
    const selectElement = screen.getByText(/filter by industry/i)
    expect(selectElement).toBeInTheDocument()
  })

  // Renders a Select component with options based on unique industries from mockData
  it('should render a Select component with options based on unique industries from mockData', async () => {
    const uniqueOptionsNumber = Array.from(
      new Set(mockData.map(({ industry }) => industry)),
    ).length

    const { user } = renderWithUser(<SelectFilter />)
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toBeInTheDocument()

    await user.click(selectElement)
    const selectOptions = screen.getAllByRole('option')
    expect(selectOptions.length).toBe(uniqueOptionsNumber)
  })

  it('should allow user to select multiple options and update state accordingly', async () => {
    const { user } = renderWithUser(<SelectFilter />)
    const selectElement = screen.getByRole('combobox')
    await user.click(selectElement)
    const oilOption = screen.getByRole('option', {
      name: /Oil and Gas Equipment/i,
    })
    await user.click(oilOption)
    const selectedOilOption = screen.getByText(/Oil and Gas Equipment/i)
    expect(selectedOilOption).toBeInTheDocument()
    await user.click(selectElement)
    const foodOption = screen.getByRole('option', {
      name: /Food Consumer Products/i,
    })
    await user.click(foodOption)
    const selectedFoodOption = screen.getByText(/Food Consumer Products/i)
    expect(selectedFoodOption).toBeInTheDocument()
  })

  it('should allow user to remove option from selection', async () => {
    const { user } = renderWithUser(<SelectFilter />)
    const selectElement = screen.getByRole('combobox')
    await user.click(selectElement)
    const oilOption = screen.getByRole('option', {
      name: /Oil and Gas Equipment/i,
    })
    await user.click(oilOption)
    const removeSelectedOilOption = screen.getByRole('button', {
      name: /remove oil and gas equipment/i,
    })
    await user.click(removeSelectedOilOption)
    const removedOilOption = screen.queryByText(/Oil and Gas Equipment/i)
    expect(removedOilOption).toBeNull()
  })

  it('should allow user to search for options', async () => {
    const { user } = renderWithUser(<SelectFilter />)
    const selectElement = screen.getByRole('combobox')
    await user.click(selectElement)
    await user.type(selectElement, 'oil')
    const selectOptions = screen.getAllByRole('option')
    expect(selectOptions.length).toBe(1)
  })
})
