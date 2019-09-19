var path = require('path')
var webpack = require('webpack')
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
          options: {
            configFile: path.resolve(__dirname, '../.babelrc')
          }
        },
        {
          loader: 'ts-loader',
          options: {
            context: __cwd,
            configFile: path.resolve(__dirname, '../tsconfig.json')
          }
        }
      ]
    }
  )
  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify('prod')
    })
  )
  return baseConfig
}
