'use strict';

const path = require('path')
const merge = require('webpack-merge')
 const utils = require('./utils') 
const baseWebpackConfig = require('./webpack.base.conf')
const nodeExternals = require('webpack-node-externals')
 const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction ? config.build.productionSourceMap: config.dev.cssSourceMap; 


function resolve(dir) {
  return path.join(__dirname, dir)
}

let skeletonWebpackConfig  = merge(baseWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: {
    app: resolve('../src/entry-skeleton.js')
  },
  output: Object.assign({}, baseWebpackConfig.output, {
    libraryTarget: 'commonjs2'
  }),
  externals: nodeExternals({
    whitelist: /\.css$/
  }), 
  plugins: [] 
})

//important: enable extract-text-webpack-plugin
 skeletonWebpackConfig.module.rules[0].options.loaders = utils.cssLoaders({//若只需要生产环境设置骨架屏，可删除
  sourceMap: sourceMapEnabled,
  extract: true
}); 

module.exports= skeletonWebpackConfig;
