const path = require('path');
const webpack = require('webpack')

module.exports = {
    // webpack config for uses
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    devServer: {
        port: 1234,
        contentBase: path.join(__dirname, "dist")
    }
}


