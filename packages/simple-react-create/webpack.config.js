const CreateVersion = require('./pulgins/createVersion')

module.exports = (config, env) => {
  // console.log(config, env, 'custom config')
  // if (env === 'dev') {

  // } else {env === 'prod'} {

  // }
  if (config.plugins) {
    config.plugins.push(
      new CreateVersion({
        BUILD_TIME: new Date().getTime()
      })
    )
  }
  return config
}
