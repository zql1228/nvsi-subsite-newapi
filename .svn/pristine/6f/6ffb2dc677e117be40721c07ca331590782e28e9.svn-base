'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')//骨架屏插件
const Verson=new Date().getTime();

const env = require('../config/prod.env')
//const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash]'+Verson+'.js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash]'+Verson+'.js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({//压缩html和css代码
      uglifyOptions: {
        output:{
            comments:false//删除注释
        },
        compress: {
          warnings: false,//去除警告
          drop_debugger:true,//删除debugger
          drop_console: true,//console
          pure_funcs: ['console.log']//移除console.log，防止可能造成的内存泄漏
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash]'+Verson+'.css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      //原assets，开启gzip压缩
      filename: config.build.index,
      template: 'index.html',
      favicon: path.resolve('favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,// 移除属性的引号
        minifyCSS: true // 压缩内联的 CSS
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
  /*new webpack.optimize.CommonsChunkPlugin({  //去除commonsChunkPlugin,采用dll分包
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),  */
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
/* new webpack.optimize.CommonsChunkPlugin({ //去除commonsChunkPlugin,采用dll分包
      name: 'manifest',
      minChunks: Infinity
    }),  */
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
/*  new webpack.optimize.CommonsChunkPlugin({ //去除commonsChunkPlugin,采用dll分包
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),  */

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
     new SkeletonWebpackPlugin({//骨架屏
       webpackConfig: require('./webpack.skeleton.conf'),
       quiet: true,
       minimize: true,
       router: {
         mode: 'hash',
         routes: [
           {
             path: '/:define/home',    //对应使用路由
             skeletonId: 'skeleton'    // 所用骨架屏的id标识
           },
         ]
       }
     }),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',// 压缩后的文件名(保持原文件名，后缀加.gz)
      algorithm: 'gzip',//压缩算法/功能
      test: new RegExp(//匹配文件名
        '\\.(' +config.build.productionGzipExtensions.join('|') +')$'
      ),
      threshold: 10240,//对超过10k的数据压缩
     // deleteOriginalAssets:true,// 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      minRatio: 0.8//压缩率小于0.8才会压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
