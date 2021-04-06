const IS_PROD = 'production'.includes(process.env.NODE_ENV)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
        'store':'@/store',
        'assets':'@/assets'
      }
    }
  },
  devServer: {
    open: true, // npm run serve后自动打开页面
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,  //设置是否跨域
        ws: true,
        pathRewrite: { //访问路径重写
          '^/api': ''
        }
      },
      '/socket.io':{
        target: 'http://127.0.0.1:8000/', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true,
        logLevel: 'debug'
      },
    }
  },
  css: {
    extract: IS_PROD, // css分离,与HMR不兼容
    sourceMap: !IS_PROD,
    loaderOptions: {
      sass: {
        // 引入全局样式
        prependData: '@import "assets/scss/global.scss";'
      }
    },
    requireModuleExtension: true
  },
}