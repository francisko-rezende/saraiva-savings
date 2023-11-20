import { render, screen } from '@testing-library/react'
import { SelectFilter } from '.'
import { renderWithUser } from '@/utils/tests/helpers'

const mockData = [
  {
    date: 1682698259192,
    amount: '5565',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: 1673216606378,
    amount: '3716',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'General Mills',
    industry: 'Food Consumer Products',
    state: 'MN',
  },
  {
    date: 1671293734303,
    amount: '1480',
    transaction_type: 'withdraw',
    currency: 'brl',
    account: 'Wynn Resorts',
    industry: 'Hotels',
    state: 'NV',
  },
  {
    date: 1661438596457,
    amount: '6894',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Hyatt Hotels',
    industry: 'Hotels',
    state: 'IL',
  },
  {
    date: 1671305218364,
    amount: '4390',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Fossil Group',
    industry: 'Apparel',
    state: 'TX',
  },
  {
    date: 1669009703807,
    amount: '761',
    transaction_type: 'withdraw',
    currency: 'brl',
    account: 'Wyndham Worldwide',
    industry: 'Hotels',
    state: 'NJ',
  },
]

describe('<SelectFilter />', () => {
  it('should display a placeholder text prompting user to filter by industry', () => {
    render(<SelectFilter />)
    const selectElement = screen.getByText(/filter by industry/i)
    expect(selectElement).toBeInTheDocument()
  })

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
