//устанавливаем зависимости npm install
//подключаем плагин normalize.css https://www.npmjs.com/package/normalize.css
//npm install --save normalize.css
const {src, dest, task, series, watch} = require('gulp');
//подключаем плагин gulp-rm https://www.npmjs.com/package/gulp-rm
//npm install --save-dev gulp-rm
const rm = require( 'gulp-rm' );
//подключаем плагин gulp-sass https://www.npmjs.com/package/gulp-sass
//npm install node-sass gulp-sass --save-dev
const sass = require('gulp-sass');
//подключаем плагин gulp-concat https://www.npmjs.com/package/gulp-concat
//npm install --save-dev gulp-concat
const concat = require('gulp-concat');
//подключаем плагин browser-sync https://www.browsersync.io/docs/gulp
//npm install browser-sync --save-dev
const browserSync = require('browser-sync').create();
//перезагрузка сервера после изменений
const reload = browserSync.reload;
//подключаем плагин gulp-sass-glob https://www.npmjs.com/package/gulp-sass-glob
//npm install gulp-sass-glob --save-dev
const sassGlob = require('gulp-sass-glob');
//подключаем плагин gulp-autoprefixer https://www.npmjs.com/package/gulp-autoprefixer
//npm install --save-dev gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
//подключаем плагин gulp-smile-px2rem https://www.npmjs.com/package/gulp-smile-px2rem
//npm install --save-dev gulp-smile-px2rem
const px2rem = require('gulp-smile-px2rem');
//подключаем плагин gulp-group-css-media-queries https://www.npmjs.com/package/gulp-group-css-media-queries
//npm install --save-dev gulp-group-css-media-queries
const gcmq = require('gulp-group-css-media-queries');
//подключаем плагин gulp-clean-css https://www.npmjs.com/package/gulp-clean-css
//npm install gulp-clean-css --save-dev
const cleanCSS = require('gulp-clean-css');
//подключаем плагин gulp-sourcemaps https://www.npmjs.com/package/gulp-sourcemaps
//npm install gulp-sourcemaps --save-dev
const sourcemaps = require('gulp-sourcemaps');
//подключаем плагин gulp-babel v.7 https://www.npmjs.com/package/gulp-babel
//npm install --save-dev gulp-babel @babel/core @babel/preset-env
//const babel = require('gulp-babel');

sass.compiler = require('node-sass');

//очищаем папку, в которую компилируем файлы
task('clean', () => {
    return src( 'dist/**/*', { read: false }).pipe(rm());
});

//копируем файлы и указанной директории и с нужным расширением в папку dist и запуском автоматической перезагрузки
task('copy:html', () => {
    return src('*.html').pipe(dest('dist')).pipe(reload({stream: true}));
});

//массив из нужных файлов для склейки
const styles = [
    "node_modules/normalize.css/normalize.css",
    "css/main.scss"
];

//склека файлов массива styles
task("styles", () => {
    return src(styles)
    .pipe(sourcemaps.init())
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem()) 
        .pipe(
            autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
});

//склйка JS скриптов
task('scripts', () => {
    return src('js/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('main.js', {newLine: ";"}))
            /*.pipe(babel({
                presets: ['@babel/env']
            }))*/
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
})
//Запуск локального сервера
task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

//метод отслеживания изменений в папке css
watch('./css/**/*.scss', series('styles'));
//метод отслеживания изменений в файле html
watch('*.html', series('copy:html'));

//команада для запуска таска
task("default", series("clean", "copy:html", "styles", "scripts", "server"));