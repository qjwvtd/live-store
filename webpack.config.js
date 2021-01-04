const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 引入压缩插件
const __rules = require('./webpack.loader');

module.exports = {
    mode: 'production',
    entry: {
        "index": "./src/index.js",
        "index.min": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "[name].js",
        library: "share-store",
        libraryExport: "default", // 不添加的话引用的时候需要 tools.default
        libraryTarget: "umd" // var this window ...
    },
    externals: {
        'react': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        },
        'redux': {
            commonjs: 'redux',
            commonjs2: 'redux',
            amd: 'redux',
            root: 'Redux'
        }
    },
    module: {
        rules: __rules
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        //清除已经build过的文件
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/
            })
        ]
    }
}