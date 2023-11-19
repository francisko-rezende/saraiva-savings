import { screen } from '@testing-library/react'

import { CardTitle } from '.'
import { renderWithTheme } from '@/utils/tests/helpers'

describe('<CardTitle />', () => {
  it('should render a title with the correct variation and icon for income', () => {
    renderWithTheme(<CardTitle variation="income" />)
    const title = screen.getByText(/Receitas/i)
    const icon = screen.getByTestId('trending up icon')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should render a title with the correct variation and icon for expenses', () => {
    renderWithTheme(<CardTitle variation="expenses" />)
    const title = screen.getByText(/Despesas/i)
    const icon = screen.getByTestId('trending down icon')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should render a title with the correct variation and icon for pending transactions', () => {
    renderWithTheme(<CardTitle variation="pending" />)
    const title = screen.getByText(/Pendentes/i)
    const icon = screen.getByTestId('calendar clock icon')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should render a title with the correct variation and icon for balance', () => {
    renderWithTheme(<CardTitle variation="balance" />)
    const title = screen.getByText(/Saldo/i)
    const icon = screen.getByTestId('coins icon')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })
})
