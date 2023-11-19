import React from 'react'
import * as S from './Card.styles'
import { Amount } from '@/types/Amount'
import { TransactionCategory } from '@/types/TransactionCategory'
import { CardTitle } from '@/components/CardTitle'
import { CardAmount } from '@/components/CardAmount'

type Card = {
  variation: TransactionCategory
  value: Amount
}

export const Card = ({ variation, value }: Card) => {
  return (
    <S.Wrapper>
      <CardTitle variation={variation} />
      <CardAmount amount={value} />
    </S.Wrapper>
  )
}
