const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const program = require('commander')
const detect = require('detect-port')
const paths = require('../../config/paths')
const packages = require(paths.package)

program
  .option('-p, --port <number>', 'specified port of server')
  .option('-e, --entry <string>', 'specified entry of app')
program.parse(process.argv)
const port = program.port || 3001
const entry = program.entry || ''
var webpackConfig = require('../../config/webpack/dev.config')({
  entry
})

const options = {
  // inline: true,
  // hot: true,
  client: {
    overlay: true,
  },
  // stats: {
  //   colors: true,
  //   errors: true
  // },
  proxy: packages.proxy ? {
    '/api': {
      target: packages.proxy,
      changeOrigin: true,
      secure: false
    },
  } : undefined,
  // 启用gzip压缩一切服务:
  compress: true,
  host: '0.0.0.0',
  port: port || '8080',
  historyApiFallback: {
    index: '/index.html'
  },
  ...webpackConfig.devServer,
}
// WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(options, compiler);

detect(options.port, (err, _port) => {
  if (err) {
    // console.log(err)
  }
  if (String(port) === String(_port)) {
    startServer(port)
  } else {
    console.log(`port: ${port} was occupied, try port: ${_port}`)
    startServer(_port)
  }
})

function startServer (port) {
  // const server = new WebpackDevServer(compiler, options)

  // server.start();
  server.listen(port, options.host, () => {
    console.log('Starting server on http://' + options.host + ':' + port)
  })
}
