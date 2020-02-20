const path = require('path')
module.exports = {
  publicPath: '/', // 应用部署路径
  outputDir: 'dist', // 生产环境构建目录
  assetsDir: 'assets', // 放置生成的静态资源
  lintOnSave: process.env.NODE_ENV !== 'production', // 生产环境不启用lint
  runtimeCompiler: false, // 是否在 Vue 组件中使用 template 选项
  productionSourceMap: false, // 不需要生产环境的 source map
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/style/color.less')
      ]
    }
  },
  devServer: {
    // proxy: {}
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true,
    host: '127.0.0.1',
    port: 9000,
    https: false,
    hotOnly: false
  },
  configureWebpack: { // 配置webpack
    plugins: [],
    externals: {
      'element-ui': 'ELEMENT',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'axios': 'axios',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 依赖包超过30000bit将被单独打包
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-echarts',
            minChunks: 2,
            // name (module) {
            //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            //   return `chunk.${packageName.replace('@', '')}`
            // },
            priority: -10
          }
        }
      }
    }
  }
}
