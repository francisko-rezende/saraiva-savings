import { Transaction } from '@/types/Transaction'
import { convertToDecimal } from '@/utils/convertToDecimal'
import Decimal from 'decimal.js-light'
import { produce } from 'immer'
type CardsData = {
  income: Decimal
  expenses: Decimal
  pendingTransactions: Decimal
}

export const getCardsData = (data: Transaction[]) => {
  const now = new Date().getTime()

  const result = data
    .map((item) => ({
      ...item,
      numericAmount: convertToDecimal(item.amount),
    }))
    .reduce<CardsData>(
      (accumulator, current) => {
        const nextState = produce(accumulator, (draftState) => {
          const isPastTransaction = current.date < now
          const isFutureTransaction = !isPastTransaction
          const isDeposit = current.transaction_type === 'deposit'
          const isWithdraw = current.transaction_type === 'withdraw'

          if (isPastTransaction && isDeposit) {
            draftState.income = draftState.income.add(current.numericAmount)
          }

          if (isPastTransaction && isWithdraw) {
            draftState.expenses = draftState.expenses.sub(current.numericAmount)
          }

          if (isFutureTransaction && isDeposit) {
            draftState.pendingTransactions = draftState.pendingTransactions.add(
              current.numericAmount,
            )
          }

          if (isFutureTransaction && isWithdraw) {
            draftState.pendingTransactions = draftState.pendingTransactions.sub(
              current.numericAmount,
            )
          }
        })

        return nextState
      },
      {
        income: new Decimal(0),
        expenses: new Decimal(0),
        pendingTransactions: new Decimal(0),
      },
    )

  const { expenses, income, pendingTransactions } = result

  const cardDataPlusTotalBalance = {
    income: income.toNumber(),
    expenses: expenses.toNumber(),
    pendingTransactions: pendingTransactions.toNumber(),
    totalBalance: income.add(expenses).toNumber(),
  }

  return cardDataPlusTotalBalance
}
