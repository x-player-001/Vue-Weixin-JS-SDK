module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/componets',
        'network': '@/network',
        'weixin': '@/weixin',
      }
    }
  },
  devServer: {
    //测试获取签名的微信接口，需要配置跨域
    proxy: {
      '/wx': {
        target: 'https://qyapi.weixin.qq.com/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/wx': ''
        }
      }
    }
  }
}