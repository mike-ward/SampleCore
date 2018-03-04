const merge = require('webpack-merge');
const Uglify = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new Uglify({ sourceMap: true})]
});