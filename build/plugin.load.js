/**
 * HTML动态插入脚本之前插入自定义脚本
 * @param {*} options 绝对路径集合
 */

function LoadJSBeforeHTMLProcessing(options) {
    this.options = options;
}
    
LoadJSBeforeHTMLProcessing.prototype.apply = function(compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            for (var i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
    });
};
    
module.exports = LoadJSBeforeHTMLProcessing;