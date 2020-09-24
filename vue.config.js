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
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            //   "text-color": "#111",
            //   "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/style/variables.less";`,
          },
        },
      },
    },
  },
};
