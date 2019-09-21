const fs = require('fs')
var path = require('path')
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var paths = require('../paths')
const customWebpackConfig = fs.existsSync(paths.webpack) ? require(paths.webpack) : null
module.exports = (config) => {
  var baseConfig = require('./base.config')(config, false)
  var __cwd = process.cwd()
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      use: [
        {
          loader: 'babel-loader',
          // options: {
          //   configFile: path.resolve(__dirname, '../.babelrc')
          // }
        },
        {
          loader: 'ts-loader',
          // options: {
          //   context: __cwd,
          //   configFile: path.resolve(__dirname, '../tsconfig.json')
          // }
        }
      ]
    }
  )
  baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify('prod')
    }),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ])
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'prod')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}
