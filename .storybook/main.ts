import type { StorybookConfig } from '@storybook/react-webpack5'
import { Configuration, DefinePlugin } from 'webpack'
import path from 'path'

interface BuildPaths {
  entry: string
  build: string
  html: string
  src: string
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-styling-webpack',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // "@storybook/addon-postcss"
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpack: (config: Configuration) => {
    const paths: BuildPaths = {
      entry: '',
      build: '',
      html: '',
      src: path.resolve(__dirname, '..', 'src'),
    }

    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('ts', 'tsx')
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      '@': paths.src,
    }

    //@ts-ignore
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/ }
      }
      return rule
    })

    config.module?.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module?.rules?.push({
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: (resPath: string) =>
                Boolean(resPath.includes('module.scss')),
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    })

    const plugins = []
    config.module?.rules.push({
      test: /\.tsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
          plugins: plugins.length ? plugins : undefined,
        },
      },
    })

    config.plugins?.push(
      new DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify('http://testapi.ru'),
      })
    )
    return config
  },
}
export default config
