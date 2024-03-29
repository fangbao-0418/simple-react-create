var path = require('path')
var fs = require('fs');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var __cwd = process.cwd()
var paths = require('../paths')
var pkg = require(paths.package)

function getCompileConfig (dev) {
  const appConfig = getConfig(dev)
  const compileInclude = appConfig.compile && appConfig.compile.include
  const compileExclude = appConfig.compile && appConfig.compile.exclude
  return {
    include: compileInclude,
    exclude: compileExclude
  }
}


function getCssLoaderConfig (dev, modules = false) {
  return {
    loader: 'css-loader',
    options: {
      modules: {
        mode: modules ? 'local' : 'global',
        localIdentName: '[local]-[hash:base64:5]',
        context: path.resolve(__cwd, 'src'),
        hashPrefix: ''
      },
      sourceMap: dev
    }
  }
}

function getPostCssLoaderConfig (dev) {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: dev,
      postcssOptions: {
        // config: path.resolve(__dirname, '../postcss.config.js'),
        plugins: {
          autoprefixer: {
            overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            flexbox: 'no-2009'
          },
          'postcss-csso': !dev ? {} : false
        },
        ctx: {
          env: dev ? 'development' : 'production'
        }
      }
    }
  }
}

function getStylusLoaderConfig (dev, modules) {
  return {
    loader: 'stylus-loader',
    options: {
      sourceMap: dev
    }
  }
}

function getMiniCssExtractLoaderConfig (dev) {
  return {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // hmr: dev
    }
  }
}

function getLessLoaderConfig (dev, modules) {
  return {
    loader: 'less-loader',
    options: {
      sourceMap: dev,
      lessOptions: appConfig.lessOptions
    }
  }
}

function getStyleLoaderConfig (dev = true) {
  const config =  [{
    test: /\.css$/,
    exclude: /\.m(odule)?\.css$/,
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev),
      getPostCssLoaderConfig(dev)
    ]
  }, {
    test: /\.m(oudle)?.css$/,
    include: path.resolve(__cwd, 'src'),
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev, true),
      getPostCssLoaderConfig(dev, true)
    ]
  }, {
    test: /\.styl$/,
    include: path.resolve(__cwd, 'src'),
    exclude: /\.m(odule)?\.styl$/,
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev),
      getPostCssLoaderConfig(dev),
      getStylusLoaderConfig(dev)
    ]
  }, {
    test: /\.m(odule)?.styl$/,
    include: path.resolve(__cwd, 'src'),
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev,true),
      getPostCssLoaderConfig(dev, true),
      getStylusLoaderConfig(dev, true)
    ]
  }]
  if (pkg.devDependencies && pkg.devDependencies['less-loader']) {
    config.push({
      test: /\.less$/i,
      exclude: /\.m(odule)?\.less$/,
      // include: path.resolve(__cwd, 'src'),
      use: [
        getMiniCssExtractLoaderConfig(dev),
        getCssLoaderConfig(dev),
        getPostCssLoaderConfig(dev),
        getLessLoaderConfig(dev)
      ]
    })

    config.push({
      test: /\.m(odule)?\.less$/i,
      // include: path.resolve(__cwd, 'src'),
      use: [
        getMiniCssExtractLoaderConfig(dev),
        getCssLoaderConfig(dev, true),
        getPostCssLoaderConfig(dev, true),
        getLessLoaderConfig(dev, true)
      ]
    })
  }
  return config
}
function getImageLoaderConfig (dev = true) {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: dev ? '' : 'assets/images/' + '[name].[hash:7].[ext]'
    }
  }
}
function getFileLoaderConfig (dev = true) {
  return {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: dev ? '' : 'assets/files/' + '[name].[hash:7].[ext]'
    }
  }
}
function ExtractTextPlugin (dev = true) {
  return new MiniCssExtractPlugin({
    filename: dev ? '[name].css' : 'css/' + '[name].[contenthash:8].css',
    chunkFilename: dev ? '[id].css' : 'css/' + '[id].[contenthash:8].css',
    // allChunks: true,
    ignoreOrder: true
  })
}
const getConfig = (dev) => {
  if (fs.existsSync(paths.appConfig)) {
    const appConfig = require(paths.appConfig)
    if (appConfig instanceof Function) {
      return appConfig(dev)
    }
    return appConfig
  }
  return {}
}
module.exports = {
  getCompileConfig,
  getConfig,
  getMiniCssExtractLoaderConfig,
  getCssLoaderConfig,
  getPostCssLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  getFileLoaderConfig,
  ExtractTextPlugin
}
const appConfig = getConfig()