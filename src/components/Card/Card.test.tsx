import { screen } from '@testing-library/react'
import { Card } from '.'
import { renderWithTheme } from '@/utils/tests/helpers'

describe('<Card />', () => {
  // should render the Card with the correct title and amount
  it('should render the Card with the correct title and amount', () => {
    renderWithTheme(<Card variation="balance" value={100} />)

    expect(screen.getByText('Saldo total')).toBeInTheDocument()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
  })
})
