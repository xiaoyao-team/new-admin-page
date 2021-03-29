module.exports = {
  assetsDir: "static",
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dev-api': {
        target: "http://172.16.10.103:3000/",
        pathRewrite: { '^/dev-api': '' },
        secure: false,
        changeOrigin: true
      }
    }
  },
}