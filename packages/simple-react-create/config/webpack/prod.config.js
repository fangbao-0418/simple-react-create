/*
 * @Date: 2019-11-18 14:02:56
 * @LastEditors: fangbao
 * @LastEditTime: 2020-05-09 22:42:48
 * @FilePath: /xt-crm/Users/fb/Documents/xituan/xt-cli/config/webpack/prod.config.js
 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('../paths')
const {
  getCompileConfig
} = require('./utils')
const customWebpackConfig = fs.existsSync(paths.webpack) ? require(paths.webpack) : null
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
module.exports = (config) => {
  var baseConfig = require('./base.config')(config, false)
  var __cwd = process.cwd()
  const compileConfig = getCompileConfig(false)
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: compileConfig.include || path.resolve(__cwd, 'src'),
      exclude: compileConfig.exclude || /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            configFile: path.resolve(__cwd, './.babelrc')
          }
        },
        {
          loader: 'ts-loader',
          options: {
            context: __cwd,
            transpileOnly: true,
            configFile: path.resolve(__cwd, './tsconfig.json')
          }
        }
      ]
    }
  )
  baseConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        context: __cwd,
        configFile: path.resolve(__cwd, './tsconfig.json'),
        profile: true
      }
    })
  )
  baseConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: true,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  }
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'prod')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}
