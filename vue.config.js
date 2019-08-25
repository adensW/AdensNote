const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    devtool: 'source-map'

  },
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('libs', resolve('src/common/libs'))
      .set('utils', resolve('src/common/utils'))
      .set('apis', resolve('src/common/apis'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('services', resolve('src/services'))
  }
}
