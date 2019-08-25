var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getStyleLoaderConfig (dev, modules = false) {
  return  {
    test: /\.styl$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: modules,
          localIdentName: '[local]-[hash:base64:5]',
          sourceMap: dev
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: dev
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: dev
        }
      }
    ]
  }
}
function getImageLoaderConfig (dev) {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: '[name].[hash:7].[ext]'
    }
  }
}
function getFileLoaderConfig (dev) {
  return {
    test: /\.(woff2?|eot|ttf|otf|svg|mp3|pdf|xlsx)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: '[name].[hash:7].[ext]'
    }
  }
}
function ExtractTextPlugin (dev) {
  return new MiniCssExtractPlugin({
    filename: 'common.css',
    allChunks: true
  })
}
module.exports = {
  getStyleLoaderConfig,
  getImageLoaderConfig,
  getFileLoaderConfig,
  ExtractTextPlugin
}