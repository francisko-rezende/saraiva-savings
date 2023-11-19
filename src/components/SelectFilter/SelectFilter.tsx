'use client'

import { mockData } from '@/data/mockData'
import Select, { Options } from 'react-select'
import { useState } from 'react'

type Option = { label: string; value: string }

export const SelectFilter = () => {
  const industrySet = new Set(mockData.map(({ industry }) => industry))
  const options = Array.from(industrySet).map((industry) => ({
    value: industry,
    label: industry,
  }))
  const [selected, setSelected] = useState<Options<Option>>([])

  return (
    <Select
      value={selected}
      onChange={(newValue) => {
        setSelected(newValue)
      }}
      placeholder={'Filter by industry'}
      isMulti
      isSearchable
      options={options}
    />
  )
}
