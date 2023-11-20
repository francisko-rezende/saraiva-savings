import { Transaction } from '@/types/Transaction'
import { formatISO, isBefore } from 'date-fns'
import Decimal from 'decimal.js-light'
import { convertToDecimal } from '@/utils/convertToDecimal'
import { produce } from 'immer'

type BarChartDataWithDecimal = {
  totalWithdrawn: Decimal
  isoDate: string
  totalDeposited: Decimal
}

export const getBarChartData = (data: Transaction[]) => {
  const chartData = [...data]
    .sort((a, b) => (isBefore(a.date, b.date) ? -1 : 1))
    .map((item) => ({
      ...item,
      numericAmount: convertToDecimal(item.amount),
      isoDate: formatISO(item.date, {
        representation: 'date',
      }),
    }))
    .reduce<BarChartDataWithDecimal[]>((accumulator, current) => {
      const hasEntryForCurrentDate = accumulator.some(
        (item) => item.isoDate === current.isoDate,
      )

      if (hasEntryForCurrentDate) {
        const nextState = produce(accumulator, (draftState) => {
          const dateAmount = draftState.find(({ isoDate }) => {
            return isoDate === current.isoDate
          })!
          current.transaction_type === 'deposit'
            ? (dateAmount.totalDeposited = dateAmount.totalDeposited.add(
                current.numericAmount,
              ))
            : (dateAmount.totalWithdrawn = dateAmount.totalWithdrawn.sub(
                current.numericAmount,
              ))
        })
        return nextState
      }
      const result =
        current.transaction_type === 'deposit'
          ? [
              ...accumulator,
              {
                totalDeposited: current.numericAmount,
                isoDate: current.isoDate,
                totalWithdrawn: new Decimal(0),
              },
            ]
          : [
              ...accumulator,
              {
                totalDeposited: new Decimal(0),
                isoDate: current.isoDate,
                totalWithdrawn: current.numericAmount.neg(),
              },
            ]

      return result
    }, [])
    .map((item) => ({
      ...item,
      totalDeposited: item.totalDeposited.toNumber(),
      totalWithdrawn: item.totalWithdrawn.toNumber(),
    }))

  return chartData
}
