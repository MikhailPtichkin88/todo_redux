import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript"
export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development"

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{
      loader: '@svgr/webpack', options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: "convertColors",
              params: {
                currentColor: true
              }
            }
          ]
        }
      }
    }],
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const cssLoader = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[local]__[name]" : "[hash:base64:8]"
      },
    },
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoader,
      "sass-loader",
    ],
  }

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{ loader: 'ts-loader', options: { 
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
      }),
      transpileOnly: true } }
    ]
  }

  return [
    svgLoader,
    assetLoader,
    scssLoader,
    tsLoader,
  ]
}