const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const package = require('./package.json')
let dependencies = Object.keys(package.dependencies) || []
//如果使用了chrome的vue-devtool，那打包的时候把vue也排除掉，因为压缩过的vue是不能使用vue-devtool的
dependencies = dependencies.length > 0 ? dependencies.filter(item => item !== 'vue') : []

module.exports = {
  // 要打包的模块的数组
  entry: {
    vendor: dependencies
  },
  output: {
    path: path.join(__dirname, '../static'), // 打包后文件输出的位置
    filename: 'dll.[name]_[hash:6].js',// vendor.dll.js中暴露出的全局变量名。
    library: '[name]_[hash:6]' // 与webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),//. 指当前目录
      name: '[name]', 
      context: __dirname
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
}