import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { theme } from '@/styles/theme'
import { FiltersProvider } from '@/components/FiltersContext/FiltersContext'

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(
    <FiltersProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </FiltersProvider>,
  )

export const renderWithUser = (component: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(component),
  }
}
