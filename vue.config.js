module.exports = {
  assetsDir: "static",
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/dev-api': {
    //     target: "http://127.0.0.1:9100/",
    //     pathRewrite: { '^/dev-api': '' },
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  },
}