//устанавливаем зависимости npm install
//устанавливаем jquery npm istall jquery
//подключаем плагин normalize.css https://www.npmjs.com/package/normalize.css
//npm install --save normalize.css
const {src, dest, task, series, watch, parallel} = require('gulp');
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
const babel = require('gulp-babel');
//подключаем плагин gulp-uglify https://www.npmjs.com/package/gulp-uglify
//npm install --save-dev gulp-uglify
var uglify = require('gulp-uglify');
//устанавливаем оптимизацию svg кода https://www.npmjs.com/package/gulp-svg-sprite
//npm install gulp-svgo gulp-svg-sprite --save-dev
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
//подключаем плагин для работы с dev и prod https://www.npmjs.com/package/gulp-if
//npm install gulp-if --save-dev
//npm install cross-env --save-dev
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

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
    .pipe(gulpif(env =='dev', sourcemaps.init()) )
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem()) 
        .pipe(gulpif(env=='dev', 
        autoprefixer({
            cascade: false
        }))
        )
        .pipe(gulpif(env == 'prod', gcmq()))
        .pipe(gulpif(env == 'prod', cleanCSS()))
        .pipe(cleanCSS())
    .pipe(gulpif(env == 'dev',  sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

//массив скриптов и библиотек для проекта
const libs = [
    "node_modules/jquery/dist/jquery.js",
    "js/*.js"
]
//склйка JS скриптов
task('scripts', () => {
    return src(libs)
        .pipe(sourcemaps.init())
            .pipe(concat('main.min.js', {newLine: ";"}))
            .pipe(babel({
                presets: ['@babel/env']
            }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
})

//создание иконок
task("icons", () => {
    return src('images/icons/*.svg')
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {attrs: "(fill|stroke|style|width|height|data.*)"}
            }
        ]
    })
    )
    /*.pipe(svgSprite({
        mode: {
            symdol: {
                sprite: "sprite.svg"
            }
        }
    }))*/
    .pipe(dest('dist/images/icons'));
});

//Запуск локального сервера
task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task("watch", () => {
    //метод отслеживания изменений в папке css
    watch('./css/**/*.scss', series('styles'));
    //метод отслеживания изменений в файле html
    watch('*.html', series('copy:html'));
    //метод отслеживания изменений в файле js
    watch('./js/*.js', series('scripts'));
    //метод отслеживания изменений в папке icons
    watch('./images/icons/*.svg', series('icons'));
});

//команада для запуска таска с параллельным запуском таска
task("default", 
    series(
        "clean", 
        parallel("copy:html", "styles", "scripts", "icons"),
        parallel("watch", "server")
    )
);

task("build", 
    series(
        "clean", 
        parallel("copy:html", "styles", "scripts", "icons"))
);