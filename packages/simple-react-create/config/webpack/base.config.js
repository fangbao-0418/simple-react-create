var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var __cwd = process.cwd()
var {
  getFileLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  ExtractTextPlugin
} = require('./utils')
module.exports = (config = {}, dev = true) => {
  const entry = config.entry
  const outdir = config.outdir || 'dist'
  var plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__cwd, 'src/index.html'),
      // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
      inject: true,
      favicon: null
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          configFile: path.resolve(__dirname, '../.eslintrc.json'),
          cache: false
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    ExtractTextPlugin(dev),
    new webpack.ProvidePlugin({
      APP: path.resolve(__cwd, 'src/utils/app')
    })
  ]
  return {
    mode: dev ? 'development' : 'production',
    entry: {
      app: path.resolve(__cwd, 'src/', entry)
    },
    output: {
      path: path.resolve(__cwd, outdir),
      filename: dev ? undefined : 'js/' + '[name].bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          include: path.resolve(__cwd, 'src'),
          use: [
            'source-map-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__cwd, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, '../.babelrc')
            }
          }
        },
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          include: path.resolve(__cwd, 'src'),
          use: [
            {
              loader: 'tslint-loader',
              options: {
                configFile: path.resolve(__dirname, '../tslint.json'),
                tsConfigFile: path.resolve(__dirname, '../tsconfig.json')
              }
            }
          ]
        },
        ...getStyleLoaderConfig(dev),
        getImageLoaderConfig(dev),
        getFileLoaderConfig(dev)
      ]
    },
    plugins: plugins,
    resolve: {
      modules: [
        path.resolve(__cwd, 'node_modules'),
        path.resolve(__cwd, 'src')
      ],
      extensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.min.js',
        '.json',
        '.styl',
        '.css'
      ],
      alias: {
        '@': path.join(__cwd, 'src')
      }
    },
    devtool: dev ? 'source-map' : ''
  }
}
