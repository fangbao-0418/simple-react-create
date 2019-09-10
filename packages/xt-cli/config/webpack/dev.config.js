var path = require('path')
module.exports = (config) => {
  var baseConfig = require('./base.config')(config, true)
  var __cwd = process.cwd()
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            context: __cwd,
            configFileName: path.resolve(__dirname, '../tsconfig.json'),
            useCache: true,
            useBabel: true,
            babelOptions: {
              configFile: path.resolve(__dirname, '../.babelrc')
            },
            babelCore: '@babel/core'
          }
        }
      ]
    }
  )
  return baseConfig
}
