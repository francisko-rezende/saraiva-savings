import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { GlobalStyles } from '../src/styles/global'

export const decorators = [withThemeFromJSXProvider({ GlobalStyles })]
