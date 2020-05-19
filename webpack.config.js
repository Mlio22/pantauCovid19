const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        support: "./src/script/support.js",
        main: "./src/script/view/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ["file-loader"]
        }, {
            test: /\.svg$/,
            loader: "svg-inline-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: "defer"
        })
    ]
}