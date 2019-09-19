module.exports = {
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:4040",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
