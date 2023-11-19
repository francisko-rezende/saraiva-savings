import { Transaction } from '@/types/Transaction'
import { getLineChartData } from './getLineChartData'

describe('getLineChartData', () => {
  it('should return an empty array when transactions is empty', () => {
    const transactions: Transaction[] = []
    const result = getLineChartData(transactions)
    expect(result).toEqual([])
  })

  it('should return an array of objects with isoDate and totalAmount properties', () => {
    const transactions: Transaction[] = [
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
        date: 1630444800000,
        amount: '50',
        transaction_type: 'withdrawal',
        currency: 'brl',
        account: '0987654321',
        industry: 'Retail',
        state: 'NY',
      },
    ]
    const result = getLineChartData(transactions)
    expect(result).toEqual([
      {
        isoDate: '2021-08-31',
        totalAmount: 0.5,
      },
    ])
  })

  it('should sort transactions by date in ascending order', () => {
    const transactions: Transaction[] = [
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
        date: 1630358400000,
        amount: '50',
        transaction_type: 'withdrawal',
        currency: 'brl',
        account: '0987654321',
        industry: 'Retail',
        state: 'NY',
      },
    ]
    const result = getLineChartData(transactions)
    expect(result).toEqual([
      {
        isoDate: '2021-08-30',
        totalAmount: 0.5,
      },
      {
        isoDate: '2021-08-31',
        totalAmount: 1,
      },
    ])
  })

  it('should handle transactions with invalid date strings', () => {
    const transactions: Transaction[] = [
      {
        date: NaN,
        amount: '100',
        transaction_type: 'deposit',
        currency: 'brl',
        account: '1234567890',
        industry: 'Finance',
        state: 'completed',
      },
      {
        date: 1630358400000,
        amount: '50',
        transaction_type: 'withdrawal',
        currency: 'brl',
        account: '0987654321',
        industry: 'Retail',
        state: 'completed',
      },
    ]
    expect(() => getLineChartData(transactions)).toThrow()
  })
})
