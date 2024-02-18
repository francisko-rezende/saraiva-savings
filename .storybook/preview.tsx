import * as React from 'react'
import { FiltersProvider } from './../src/components/FiltersContext/FiltersContext'
import { theme } from './../src/styles/theme'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { GlobalStyles } from '../src/styles/global'
import { ThemeProvider } from 'styled-components'

export const decorators = [
  withThemeFromJSXProvider({
    Provider: ThemeProvider,
    themes: {
      default: theme,
    },
    defaultTheme: 'default',
    GlobalStyles,
  }),
  (Story) => (
    <FiltersProvider>
      <Story />
    </FiltersProvider>
  ),
]
