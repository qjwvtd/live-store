const path = require('path');
const babelLoader = {
    test: /\.(js|jsx)$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                ['@babel/preset-env', { targets: "defaults" }]
            ]
        }
    }
};
const esLintLoader = {
    test: /\.(js|jsx)$/,
    use: [{
        loader: 'eslint-loader',
        options: { // 这里的配置项参数将会被传递到 eslint的CLIEngine
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
    }],
    enforce: "pre", // 编译前检查
    include: path.resolve(__dirname, './src'),
    exclude: [/node_modules/, path.resolve(__dirname, './dist')]
};
module.exports = [babelLoader, esLintLoader];