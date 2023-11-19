import { formatISO, isBefore } from 'date-fns'
import { convertToDecimal } from '@/utils/convertToDecimal'
import Decimal from 'decimal.js-light'
import { produce } from 'immer'
import { Transaction } from '@/types/Transaction'

type LineChartDataWithDecimal = { totalAmount: Decimal; isoDate: string }

export const getLineChartData = (transactions: Transaction[]) => {
  const lineChartData = [...transactions]
    .sort((a, b) => (isBefore(a.date, b.date) ? -1 : 1))
    .map((item) => ({
      ...item,
      numericAmount: convertToDecimal(item.amount),
      isoDate: formatISO(item.date, {
        representation: 'date',
      }),
    }))
    .reduce<LineChartDataWithDecimal[]>((accumulator, current) => {
      const hasEntryForCurrentDate = accumulator.some(
        (item) => item.isoDate === current.isoDate,
      )

      if (hasEntryForCurrentDate) {
        const nextState = produce(accumulator, (draftState) => {
          const dateAmount = draftState.find(({ isoDate }) => {
            return isoDate === current.isoDate
          })!
          current.transaction_type === 'deposit'
            ? (dateAmount.totalAmount = dateAmount.totalAmount.add(
                current.numericAmount,
              ))
            : (dateAmount.totalAmount = dateAmount.totalAmount.sub(
                current.numericAmount,
              ))
        })
        return nextState
      }
      return [
        ...accumulator,
        { totalAmount: current.numericAmount, isoDate: current.isoDate },
      ]
    }, [])
    .map((item) => ({
      ...item,
      totalAmount: item.totalAmount.toNumber(),
    }))

  return lineChartData
}
