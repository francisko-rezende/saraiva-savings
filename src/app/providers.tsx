'use client'

import { FiltersProvider } from '@/components/FiltersContext/FiltersContext'
import { GlobalStyles } from '@/styles/global'
import { theme } from '@/styles/theme'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'

export function Providers({ children }: PropsWithChildren) {
  return (
    <FiltersProvider>
      <ThemeProvider theme={theme}>
        {children}
        <GlobalStyles />
      </ThemeProvider>
    </FiltersProvider>
  )
}
