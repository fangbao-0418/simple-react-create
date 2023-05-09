var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ESLintPlugin = require('eslint-webpack-plugin');

var __cwd = process.cwd()
var {
  getFileLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  ExtractTextPlugin,
  getCompileConfig,
  getConfig
} = require('./utils')
module.exports = (config = {}, dev = true) => {
  const entry = config.entry
  const outdir = config.outdir || 'dist'
  const appConfig = getConfig(dev)
  const compileConfig = getCompileConfig(dev)
  
  var plugins = [
    new HtmlWebpackPlugin({
      template: appConfig.template || path.resolve(__cwd, 'src/index.html'),
      // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
      inject: true,
      favicon: appConfig.favicon === false ? undefined : path.resolve(__cwd, 'src/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    ExtractTextPlugin(dev),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new webpack.ProvidePlugin({
      APP: path.resolve(__cwd, 'src/utils/app')
    }),
    new webpack.DefinePlugin(
      appConfig.define || {}
    ),
    ...(appConfig.plugins || [])
  ]
  
  return {
    mode: dev ? 'development' : 'production',
    entry: {
      app: path.resolve(__cwd, 'src/', entry)
    },
    output: {
      path: path.resolve(__cwd, outdir),
      filename: dev ? undefined : 'js/' + '[name]-[contenthash].bundle.js',
      chunkFilename: dev ? undefined : 'js/' + '[id]-[contenthash].chunk.js',
      publicPath: appConfig.publicPath || '/',
      uniqueName: appConfig.uniqueName
    },
    target: ['web', 'es5'],
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.(js|ts)x?$/,
        //   include: path.resolve(__cwd, 'src'),
        //   use: [
        //     'source-map-loader',
        //     'eslint-loader'
        //   ]
        // },
        {
          test: /\.jsx?$/,
          include: compileConfig.include || path.resolve(__cwd, 'src'),
          exclude: compileConfig.exclude || /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__cwd, './.babelrc')
            }
          }
        },
        ...getStyleLoaderConfig(dev),
        getImageLoaderConfig(dev),
        getFileLoaderConfig(dev),
        ...(appConfig.rules || [])
      ]
    },
    plugins: plugins,
    resolve: {
      modules: [
        path.resolve(__cwd, 'src'),
        path.resolve(__cwd, 'node_modules'),
        'node_modules'
      ],
      extensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.min.js',
        '.json',
        '.styl',
        '.css',
        '.less'
      ],
      alias: appConfig.alias || {
        '@': path.join(__cwd, 'src')
      }
    },
    devtool: dev ? 'source-map' : false
  }
}
