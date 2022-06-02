"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
const ip = require("ip").address();

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/nvsidfapis": {
        // target: "https://wuhan.yxybb.com", //测试
        //target: "http://192.168.5.114:8009", //胡晨
        //target: "http://192.168.5.92:8089", //李想 NVSILX
        // target: "http://192.168.5.93:8009", //冯创新
        // target: "http://192.168.5.95:8011", //胡圣峰 NVSIDDD
        //target: "http://192.168.5.97:8008", //罗千 NVSILQ
        target: "https://chinavolunteer.mca.gov.cn", // 生产
        changeOrigin: true, //是否跨域
        secure: false, //是否为https协议
        pathRewrite: {
          //"^/nvsidfapis": "/nvsidfapis" //需要rewrite重写的,
          "^/nvsidfapis": ""
        }
      }
    },
    // Various Dev Server settings
    host: ip, // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map", //'source-map',//不编译

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../subsite/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../subsite"),
    assetsSubDirectory: "static",
    //assetsPublicPath: '/',//vue开发环境配置
    //assetsPublicPath: pathname,//打包相对路径-history模式
    assetsPublicPath: "/subsite/",

    /**
     * Source Maps
     */

    productionSourceMap: false, //是否打包成map文件
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, //开启生产环境的GZIP压缩
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
