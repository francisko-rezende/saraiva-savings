import { Transaction } from '@/types/Transaction'
import { getBarChartData } from './getBarChartData'

describe('getBarChartData', () => {
  it('should return an empty array when input data is empty', () => {
    const data: Transaction[] = []
    const result = getBarChartData(data)
    expect(result).toEqual([])
  })

  it('should return an array with one object when input data has only one transaction', () => {
    const data: Transaction[] = [
      {
        date: 1630444800000,
        amount: '100',
        transaction_type: 'deposit',
        currency: 'brl',
        account: '1234567890',
        industry: 'Finance',
        state: 'NY',
      },
    ]
    const result = getBarChartData(data)
    expect(result).toEqual([
      {
        totalDeposited: 1,
        isoDate: '2021-08-31',
        totalWithdrawn: 0,
      },
    ])
  })

  it('should return an array with multiple objects when input data has multiple transactions', () => {
    const data: Transaction[] = [
      {
        date: 1630444800000,
        amount: '100',
        transaction_type: 'deposit',
        currency: 'brl',
        account: '1234567890',
        industry: 'Finance',
        state: 'NY',
      },
      {
        date: 1630531200000,
        amount: '50',
        transaction_type: 'withdrawal',
        currency: 'brl',
        account: '0987654321',
        industry: 'Retail',
        state: 'NY',
      },
    ]
    const result = getBarChartData(data)
    expect(result).toEqual([
      {
        totalDeposited: 1,
        isoDate: '2021-08-31',
        totalWithdrawn: 0,
      },
      {
        totalDeposited: 0,
        isoDate: '2021-09-01',
        totalWithdrawn: -0.5,
      },
    ])
  })
})
