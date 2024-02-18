'use client'

import { DateRange, DayPicker } from 'react-day-picker'
import * as S from './DatePicker.styles'
import { ComponentProps, ReactNode, useState } from 'react'
import 'react-day-picker/dist/style.css'
import { Root, Trigger, Anchor, Portal, Content } from '@radix-ui/react-popover'
import { styled } from 'styled-components'
import { Calendar } from 'lucide-react'
import { formatToUSDate } from '@/utils/formatToUSDate'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type DatePicker = {
  children: ReactNode
}

const PopoverContent = styled(Content)`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacings[2]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

type Popover = {
  labelText: string
} & ComponentProps<typeof Root>

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.colors.zinc[400]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.zinc[50]};
  transition: background 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.zinc[200]};
  }
`

export const Popover = ({ children, labelText, ...props }: Popover) => (
  <Root {...props}>
    <Trigger asChild>
      <TriggerButton>
        <Calendar size={18} /> {labelText}
      </TriggerButton>
    </Trigger>
    <Anchor />
    <Portal>
      <PopoverContent>{children}</PopoverContent>
    </Portal>
  </Root>
)

export const DatePicker = () => {
  const today = new Date()

  const [isOpen, setIsOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>()
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const from = formatToUSDate(searchParams.get('from')?.toString())
  const to = formatToUSDate(searchParams.get('to')?.toString())

  const handleSetDateRange = () => {
    if (range && range.to && range.from) {
      const dateRangeParams = new URLSearchParams({
        from: range.from.getTime().toString(),
        to: range.to.getTime().toString(),
      })

      replace(`${pathname}?${dateRangeParams.toString()}`)
    }
  }

  const handleClose = () => setIsOpen(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      labelText={`${from} – ${to}`}
    >
      <S.Wrapper>
        <DayPicker
          id="test"
          mode="range"
          numberOfMonths={2}
          defaultMonth={today}
          selected={range}
          onSelect={setRange}
        />
        <button onClick={handleSetDateRange}>Select range</button>
        <button onClick={handleClose}>Close</button>
      </S.Wrapper>
    </Popover>
  )
}
