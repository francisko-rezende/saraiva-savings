import { Transaction } from '@/types/Transaction'
import { getCardsData } from './getCardsData'
const cardsMockData = [
  {
    date: new Date().getTime() - 1000,
    amount: '1000',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: new Date().getTime() - 1000,
    amount: '1000',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: new Date().getTime() - 1000,
    amount: '1000',
    transaction_type: 'withdraw',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: new Date().getTime() + 2000,
    amount: '2000',
    transaction_type: 'deposit',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: new Date().getTime() + 2000,
    amount: '2000',
    transaction_type: 'withdraw',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
  {
    date: new Date().getTime() + 2000,
    amount: '2000',
    transaction_type: 'withdraw',
    currency: 'brl',
    account: 'Baker Hughes',
    industry: 'Oil and Gas Equipment',
    state: 'TX',
  },
]
describe('getCardsData', () => {
  it('should correctly calculate income, expenses, pendingTransactions, and totalBalance when given valid input data', () => {
    const result = getCardsData(cardsMockData)

    expect(result.income).toBe(20)
    expect(result.expenses).toBe(-10)
    expect(result.pendingTransactions).toBe(-20)
    expect(result.totalBalance).toBe(10)
  })

  it('should correctly handle empty input data and return all values as 0', () => {
    const data: Transaction[] = []

    const result = getCardsData(data)

    expect(result.income).toBe(0)
    expect(result.expenses).toBe(0)
    expect(result.pendingTransactions).toBe(0)
    expect(result.totalBalance).toBe(0)
  })
})
