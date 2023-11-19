'use client'

import { GlobalStyles } from '@/styles/global'
import { theme } from '@/styles/theme'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {children}
        <GlobalStyles />
      </ThemeProvider>
    </>
  )
}
