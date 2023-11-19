import Decimal from 'decimal.js-light'
import { convertToAmount } from '@/utils/convertToAmount'

export const convertToDecimal = (amount: string) => {
  const amountWithDecimalPlaces = convertToAmount(amount)
  return new Decimal(amountWithDecimalPlaces).toDecimalPlaces(2)
}
