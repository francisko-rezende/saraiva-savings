'use client'

import { Option } from '@/types/Option'
import { createContext, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Options } from 'react-select'

const useSelectFilterState = () => useState<Options<Option>>([])
const useSelectedDateRangeState = () => useState<DateRange | undefined>()

type Filters = {
  selectedDateRangeState: ReturnType<typeof useSelectedDateRangeState>
  selectedAccountsState: ReturnType<typeof useSelectFilterState>
  selectedIndustriesState: ReturnType<typeof useSelectFilterState>
  selectedStatesState: ReturnType<typeof useSelectFilterState>
}

export const FiltersContext = createContext<Filters | null>(null)

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const selectedDateRangeState = useSelectedDateRangeState()
  const selectedAccountsState = useSelectFilterState()
  const selectedIndustriesState = useSelectFilterState()
  const selectedStatesState = useSelectFilterState()

  // const [selectedDateRange] = selectedDateRangeState
  // const [selectedAccounts] = selectedAccountsState
  // const [selectedIndustries] = selectedIndustriesState
  // const [selectedStates] = selectedStatesState

  // const fromTime = selectedDateRange?.from?.getTime()
  // const toTime = selectedDateRange?.to?.getTime()

  return (
    <FiltersContext.Provider
      value={{
        selectedDateRangeState,
        selectedAccountsState,
        selectedIndustriesState,
        selectedStatesState,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const filters = useContext(FiltersContext)
  if (!filters) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return filters
}
