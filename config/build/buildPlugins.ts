import { Configuration, DefinePlugin } from 'webpack'
import { BuildOptions } from './types/types'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export function buildPlugins({
  mode,
  paths,
  apiUrl,
}: BuildOptions): Configuration['plugins'] {
  const isProd = mode === 'production'
  const isDev = mode === 'development'
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      __IS_DEV__: isDev,
      __API__: JSON.stringify(isDev ? apiUrl : process.env.BASE_URL),
      __ENV__: JSON.stringify(mode),
    }),
    new ForkTsCheckWebpackPlugin(),
  ]
  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin())
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    )
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'fonts'),
            to: path.resolve(paths.output, 'fonts'),
          },
        ],
      })
    )
  }

  return plugins
}
