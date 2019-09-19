var path = require('path')
var webpack = require('webpack')
module.exports = (config) => {
  var baseConfig = require('./base.config')(config, true)
  var __cwd = process.cwd()
  console.log(__cwd + '/', 'xxxxx')
  const tsconfigFileContent = require(path.resolve(__dirname, '../tsconfig.json'))
  tsconfigFileContent.compilerOptions.baseUrl = __cwd
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            // configFileContent: tsconfigFileContent,
            // configFileName: path.resolve(__dirname, '../tsconfig.json'),
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
  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify('dev')
    })
  )
  return baseConfig
}
