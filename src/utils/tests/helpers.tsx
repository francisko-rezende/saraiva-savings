import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { theme } from '@/styles/theme'

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

export const renderWithUser = (component: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(component),
  }
}
