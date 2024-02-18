import QueryString from 'qs'
import { Transaction } from '@/types/Transaction'

type queryParams = {
  from?: number
  to?: number
}

export async function getTransactions(queryParams: queryParams) {
  const res = await fetch(
    `http://localhost:3000/api/transactions?${QueryString.stringify(
      queryParams,
    )}`,
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json() as Promise<Transaction[]>
}
