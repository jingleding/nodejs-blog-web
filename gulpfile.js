// 引入组件
var gulp = require('gulp'),                    // 引入Gulp
    minifycss = require('gulp-minify-css'),    // css压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 文件合并
    rename = require('gulp-rename'),        // 文件更名
    less = require('gulp-less'),            // less2css
    notify = require('gulp-notify'),       // 提示信息
    path = require('path');

// less to css
gulp.task('less2css', function () {
    // return    gulp.src('public/css/*.less')
    return    gulp.src(['./public/**/*.less','./public/js/ui/**/*.less'])
            .pipe(less())
            .pipe(gulp.dest('./public/output'))
            .pipe(notify({ message: 'less2css task ok' }));
});

// var watcher = gulp.watch(['./public/**/*.less','./public/js/ui/page/*.less']);
// watcher.on('change', function(event) {
//   // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });
// 合并、压缩、重命名css
// gulp.task('css', function() {
//     return    gulp.src(['./public/**/*.css','./public/js/ui/**/*.css'])
//             // .pipe(concat('main.css'))
//             // .pipe(gulp.dest('./output'))
//             .pipe(gulp.dest('./dest/css'))
//             .pipe(rename({ suffix: '.min' }))
//             .pipe(minifycss())
//             // .pipe(gulp.dest('./dest/css'))
//             .pipe(notify({ message: 'css task ok' }));
// });

// 合并、压缩js文件
// gulp.task('js', function() {

//     return    gulp.src(['./public/js/*.js','./public/script/*.js'])
//             // .pipe(concat('main.js'))
//             // .pipe(gulp.dest('./output'))
//             .pipe(gulp.dest('dest/js'))
//             .pipe(rename({ suffix: '.min' }))
//             .pipe(uglify())
//             // .pipe(gulp.dest('dest/js'))
//             .pipe(notify({ message: 'js task ok' }));
// });

// 默认任务
gulp.task('default', function(){

  gulp.run('less2css');
 
//  // Watch .css files
 gulp.watch(['./public/**/*.less','./public/js/ui/**/*.less'], ['less2css']);
// 
//  // Watch .js files
//  gulp.watch('src/js/*.js', ['js']);

});
 
//  gulp.task('watch', function() {
//     gulp.watch(paths.watchcss, function() {
//         runSequence('less', 'resolvecmpimguri');
//     });
//     gulp.watch(paths.statics, ['static']);
//     gulp.watch(paths.jsfiles.concat(paths.tplfiles), function() {
//         runSequence('processtpl', 'buildjs', 'seajscachebust');
//     });
// });

//定义一个testLess任务（自定义任务名称）
//gulp.task('testLess', function () {
//    gulp.src('src/less/index.less') //该任务针对的文件
//        .pipe(less()) //该任务调用的模块
//        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
//});
// 
//gulp.task('default',['testLess']); //定义默认任务