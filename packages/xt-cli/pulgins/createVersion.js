/*
 * @Date: 2020-05-15 18:46:20
 * @LastEditors: fangbao
 * @LastEditTime: 2020-05-15 18:49:23
 * @FilePath: /eslint-plugin-xt-react/Users/fangbao/Documents/xituan/xt-cli/pulgins/createVersion.js
 */
function CreateVersionPlugin (options) {}

CreateVersionPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    // 在生成文件中，创建一个头部字符串：
    var filelist = 'In this build:\n\n'

    // 遍历所有编译过的资源文件，
    // 对于每个文件名称，都添加一行内容。
    for (var filename in compilation.assets) {
      filelist += ('- ' + filename + '\n')
    }

    // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
    compilation.assets.version = {
      source: function () {
        return '2.1'
      }
      // size: function () {
      //   return filelist.length
      // }
    }

    callback()
  })
}

module.exports = CreateVersionPlugin
