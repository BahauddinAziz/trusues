const path = require('path');
const webpack = require('webpack')

module.exports = {
    // webpack config for uses
    mode: "development",
    entry: {
        trusues: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/main.js",
        publicPath: "/assets/"
    },
    devServer: {
        port: 1234,
        contentBase: path.join(__dirname, "dist"),
        writeToDisk: false,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


