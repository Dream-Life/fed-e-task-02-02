const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = merge(commonConfig, {
    mode: "production",
    devtool: 'none',
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                'less-loader'
            ]
        }, ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        sideEffects: true, //没有用到的模块会被去掉
        usedExports: true, //标记不使用的代码
        concatenateModules: true, // 尽可能将模块合并，webpack3添加的
        minimize: true // 去除标记的代码
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCSSPlugin(),
        new UglifyJsPlugin({

            exclude: /node_modules/
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'vue-webpack',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: resolve('public/favicon.ico')
                    // }, {
                    //     from: resolve('src/assets'),
                    //     to: 'images'
            }]
        })
    ]
})