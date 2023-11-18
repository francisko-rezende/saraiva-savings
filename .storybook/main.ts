import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal(config) {
    config.resolve?.modules?.push(`${process.cwd()}/src`)
    return config
  },
}
export default config
