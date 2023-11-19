import { Amount } from '@/types/Amount'
import * as S from './CardAmount.styles'
import { formatToBRL } from '@/utils/formatToBRL'

type ValueProps = {
  amount: Amount
}

export const CardAmount = ({ amount }: ValueProps) => {
  const value = formatToBRL(amount)

  return <S.Value>{value}</S.Value>
}
