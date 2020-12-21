// 获取 gulp
var gulp = require('gulp');
// 获取gulp模块
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
//构建到es目录
gulp.task("build", function () {
    return gulp.src("./src/index.js")//ES6源码存放的路径
        .pipe(eslint())//eslint检查
        .pipe(babel())//编译
        .pipe(uglify())//压缩
        .pipe(gulp.dest("es")); //转换成ES5存放的路径
});