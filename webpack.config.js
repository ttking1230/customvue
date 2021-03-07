const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map", //测试的时候可以快速找到源码
    resolve: {
        // 默认回去node_modules去查找,,更改模块查找方式，先从source文件夹下查找
        modules: [path.resolve(__dirname, "source"), path.resolve("node_modules")]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        })
    ]
}