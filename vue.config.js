// vue.config.js
const apiMocker = require("mocker-api");
const path = require("path");
module.exports = {
  devServer: {
    port: "9527",
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before(app) {
      apiMocker(app, path.resolve("./mocker/index.js"));
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${path.resolve(__dirname, "src/style/variables.less")}";`,
          },
        },
      },
    },
  },
};
