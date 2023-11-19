import { screen } from '@testing-library/react'
import { CardAmount } from '.'
import { renderWithTheme } from '@/utils/tests/helpers'

describe('<CardAmount />', () => {
  it('should render the heading', () => {
    renderWithTheme(<CardAmount amount={100} />)
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
  })

  it('should render "R$ 0,00" when amount is 0', () => {
    renderWithTheme(<CardAmount amount={0} />)
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument()
  })

  it('should render "-R$ 100,00" when amount is -100', () => {
    renderWithTheme(<CardAmount amount={-100} />)
    expect(screen.getByText('-R$ 100,00')).toBeInTheDocument()
  })

  it('should accept "amount" as a float and format it correctly', () => {
    renderWithTheme(<CardAmount amount={500.5} />)
    expect(screen.getByText('R$ 500,50')).toBeInTheDocument()
  })
})
