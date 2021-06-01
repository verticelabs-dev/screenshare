module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8989",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
};
