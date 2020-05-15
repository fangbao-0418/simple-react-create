/*
 * @Date: 2019-11-18 14:02:56
 * @LastEditors: fangbao
 * @LastEditTime: 2020-05-15 18:48:16
 * @FilePath: /eslint-plugin-xt-react/Users/fangbao/Documents/xituan/xt-cli/webpack.config.js
 */

const CreateVersion = require('./pulgins/createVersion')

module.exports = (config, env) => {
  // console.log(config, env, 'custom config')
  // if (env === 'dev') {

  // } else {env === 'prod'} {

  // }
  config.plugins.push(
    new CreateVersion()
  )
  console.log(config, 'config')
  return config
}
