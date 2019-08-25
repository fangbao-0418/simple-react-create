var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var __cwd = process.cwd()
console.log(path.resolve(__cwd, 'src'))
var extractCommon = new MiniCssExtractPlugin({
  filename: 'common.css',
  allChunks: true
})
var {
  getFileLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  ExtractTextPlugin
} = require('./utils')
var plugins = [
  extractCommon,
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
  new webpack.HotModuleReplacementPlugin()
]
module.exports = (dev = true) => ({
  mode: dev ? 'development' : 'production',
  entry: {
    app: path.resolve(__cwd, 'src/app')
  },
  output: {
    path: path.resolve(__cwd, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: path.resolve(__cwd, 'src'),
        exclude: [/node_modules/],
        use: [
          'source-map-loader',
          'eslint-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        include: path.resolve(__cwd, 'src'),
        exclude: [/node_modules/],
        use: [
          'tslint-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          babelCore: '@babel/core'
        }
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
        test: /\.css$/,
        exclude: path.resolve(__cwd, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true',
          'postcss-loader'
        ]
      },
      getStyleLoaderConfig(),
      getImageLoaderConfig(),
      getFileLoaderConfig()
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.resolve(__cwd, 'node_modules'),
      path.resolve(__cwd, 'src')
    ],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js', '.json', '.styl', '.css'],
    alias: {
      '@': path.join(__cwd, 'src')
    }
  },
  devtool: 'source-map'
})
