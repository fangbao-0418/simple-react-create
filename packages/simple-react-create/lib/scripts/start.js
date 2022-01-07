"use strict";

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var program = require('commander');

var detect = require('detect-port');

var paths = require('../../config/paths');

var packages = require(paths["package"]);

program.option('-p, --port <number>', 'specified port of server').option('-e, --entry <string>', 'specified entry of app');
program.parse(process.argv);
var port = program.port || 3001;
var entry = program.entry || '';

var webpackConfig = require('../../config/webpack/dev.config')({
  port: port,
  entry: entry
});

var options = {
  inline: true,
  hot: true,
  overlay: true,
  stats: {
    colors: true,
    errors: true
  },
  proxy: packages.proxy ? {
    '/api': {
      target: packages.proxy,
      changeOrigin: true,
      secure: false
    }
  } : undefined,
  // 启用gzip压缩一切服务:
  compress: true,
  host: '0.0.0.0',
  port: port,
  historyApiFallback: {
    index: '/index.html'
  }
};
WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
var compiler = webpack(webpackConfig);
detect(options.port, function (err, _port) {
  if (err) {
    console.log(err);
  }

  if (port === _port) {
    startServer(port);
  } else {
    console.log("port: ".concat(port, " was occupied, try port: ").concat(_port));
    startServer(_port);
  }
});

function startServer(port) {
  var server = new WebpackDevServer(compiler, options);
  server.listen(port, options.host, function () {
    console.log('Starting server on http://' + options.host + ':' + port);
  });
}