"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  entry: entry
});

var options = _objectSpread({
  // inline: true,
  // hot: true,
  client: {
    overlay: true
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
    }
  } : undefined,
  // 启用gzip压缩一切服务:
  compress: true,
  host: '0.0.0.0',
  port: port || '8080',
  historyApiFallback: {
    index: '/index.html'
  }
}, webpackConfig.devServer); // WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)


var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(options, compiler);
detect(options.port, function (err, _port) {
  if (err) {// console.log(err)
  }

  if (String(port) === String(_port)) {
    startServer(port);
  } else {
    console.log("port: ".concat(port, " was occupied, try port: ").concat(_port));
    startServer(_port);
  }
});

function startServer(port) {
  // const server = new WebpackDevServer(compiler, options)
  // server.start();
  server.listen(port, options.host, function () {
    console.log('Starting server on http://' + options.host + ':' + port);
  });
}