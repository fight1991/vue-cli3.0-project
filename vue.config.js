const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith') // 雪碧图插件
const templateFunc = function (data) {
  var shared = '.icon { display: inline-block; vertical-align: middle; background-image: url(I) }'.replace(
    'I',
    data.sprites[0].image
  )

  var perSprite = data.sprites
    .map(function (sprite) {
      return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y)
    })
    .join('\n')

  return shared + '\n' + perSprite
}
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
        path.join(__dirname, './src/style/variable/color.less')
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
  chainWebpack: config => { // npm run build --report查看打包后的文件结构
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
  },
  configureWebpack: { // 配置webpack
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: './src/assets/plantIcon',
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, './src/assets/sprite/sprite.png'),
          css: [
            [
              path.resolve(__dirname, './src/style/sprite.less'),
              {
                format: 'function_based_template'
              }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: '../assets/sprite/sprite.png'
        },
        customTemplates: {
          function_based_template: templateFunc
        }
      })
    ],
    externals: {
      // 'element-ui': 'ELEMENT',
      'vue-i18n': 'VueI18n',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'axios': 'axios',
      'vue-router': 'VueRouter',
      'BMap': 'BMap'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]element-ui[\\/]/
          }
          // echart: {
          //   name: 'chunk-echart',
          //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          //   test: /[\\/]node_modules[\\/]echarts[\\/]/
          // }
        }
      }
    }
  }
}
