'use client'

import { Transaction } from '@/types/Transaction'
import { createContext, useContext, useState } from 'react'

const useDataState = (initialData: Transaction[]) =>
  useState<Transaction[]>(initialData)

export const DataContext = createContext<ReturnType<
  typeof useDataState
> | null>(null)

export const DataProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData: Transaction[]
}) => {
  const dataState = useDataState(initialData)

  return (
    <DataContext.Provider value={dataState}>{children}</DataContext.Provider>
  )
}

export const useData = () => {
  const data = useContext(DataContext)
  console.log(data?.[0].length)
  if (!data) {
    throw new Error('useData must be used within a DataProvider')
  }
  return data
}
