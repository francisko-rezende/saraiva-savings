import { NextResponse } from 'next/server'
import data from '@/data/transactions.json'
import { Transaction } from '@/types/Transaction'
import { isWithinInterval } from 'date-fns'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const transactions = data as Transaction[]

  const filteredTransactions = transactions.filter(({ date }) => {
    return isWithinInterval(date, { start: Number(from), end: Number(to) })
  })

  return NextResponse.json(filteredTransactions)
}
