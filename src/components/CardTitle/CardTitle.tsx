import { CalendarClock, Coins, TrendingDown, TrendingUp } from 'lucide-react'
import * as S from './CardTitle.styles'
import { TransactionCategory } from '@/types/TransactionCategory'

type Title = {
  variation: TransactionCategory
} & React.ComponentProps<'h2'>

export const CardTitle = ({ variation, ...props }: Title) => {
  if (variation === 'income') {
    return (
      <S.Title {...props}>
        <span>Receitas</span>{' '}
        <TrendingUp data-testid="trending up icon" aria-hidden />
      </S.Title>
    )
  }

  if (variation === 'expenses') {
    return (
      <S.Title {...props}>
        <span>Despesas</span>{' '}
        <TrendingDown data-testid="trending down icon" aria-hidden />
      </S.Title>
    )
  }

  if (variation === 'pending') {
    return (
      <S.Title {...props}>
        <span>Pendentes</span>{' '}
        <CalendarClock data-testid="calendar clock icon" aria-hidden />
      </S.Title>
    )
  }

  if (variation === 'balance') {
    return (
      <S.Title {...props}>
        <span>Saldo total</span> <Coins data-testid="coins icon" aria-hidden />
      </S.Title>
    )
  }
}
