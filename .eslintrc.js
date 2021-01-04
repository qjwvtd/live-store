module.exports = {
    root: true, // 作用的目录是根目录
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
    },
    plugins: ["react", "react-hooks"],
    env: {
        browser: true, // 开发环境配置表示可以使用浏览器的方法
        node: true, //
        es6: true,
    },
    extends: "eslint:recommended",
    rules: {
        //不能有声明后未被使用的变量或参数
        "no-unused-vars": [2, { vars: "all", args: "after-used" }],
        //防止在JSX中使用的变量被错误地标记为未使用
        "react/jsx-uses-vars": 2,
        //防止react组件被错误地标记为未使用
        "react/jsx-uses-react": 2,
        // 检查 Hook 的规则
        "react-hooks/rules-of-hooks": "error",
        //未定义前不能使用
        "no-use-before-define": "error",
        "no-sparse-arrays": "error",
        "comma-dangle": ["error", "never"],
        //强制正确的分号结尾
        semi: ["error", "always"],
        //禁止出现多余的分号,如:const a = 1;;
        "no-extra-semi": "error",
        //分号必须写在行尾，禁止在行首出现
        "semi-style": ["error", "last"],
        //不能有未定义的变量
        "no-undef": 2,
        "no-var": "error",
        //块语句中的内容不能为空
        "no-empty": 2,
        //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-keys": 2,
        //禁止修改const声明的变量
        "no-const-assign": 2,
        //禁用with
        "no-with": 2,
        //new时必须加小括号
        "new-parens": 2,
        // 使用 === 替代 ==
        eqeqeq: [2, "allow-null"],
        //if 后面必须要有 {，除非是单行 if
        curly: ["error", "multi-line", "consistent"],
        //在return,throw,continue,break之后出现代码告警
        "no-unreachable": "warn",
        //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        "no-shadow": 2
    },
};
