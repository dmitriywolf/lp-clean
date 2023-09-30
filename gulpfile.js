"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoPref = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');


const dist = './dist';

// HTML
function html() {
  return gulp.src('./src/*.html')
      .pipe(gulp.dest(dist))
      .pipe(browserSync.reload({stream: true}))
}

// CSS
function style() {
  return gulp.src('./src/sass/style.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoPref({
        overrideBrowserList: ['last 10 versions'],
        cascade: false
      }))
      .pipe(cleanCSS({level: 2}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(`${dist}/css`))
      .pipe(browserSync.reload({stream: true}))
}


// JS
function scripts() {
  return gulp.src('./src/js/main.js')
      .pipe(webpack({
        mode: 'development',
        output: {
          filename: 'index.js'
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                    debug: false,
                    corejs: 3,
                    useBuiltIns: 'usage'
                  }]]
                }
              }
            }
          ]
        }
      }))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(`${dist}/js`))
      .pipe(browserSync.reload({stream: true}))
}

// Images
function img() {
  return gulp.src("./src/img/**/*.*")
      .pipe(gulp.dest(`${dist}/img`))
}

// Fonts
function fonts() {
  return gulp.src('./src/fonts/**/*.*')
      .pipe(gulp.dest(`${dist}/fonts`))
}

// Clean
function clean() {
  return del([dist])
}

// Watch
function watch() {
  browserSync.init({
    server: {
      baseDir: dist
    }
  });
  gulp.watch('./src/*.html', html);
  gulp.watch('./src/sass/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/img/**/*.*', img);
}

gulp.task('build', gulp.series(clean, gulp.parallel(html, fonts, style, scripts, img)));

gulp.task('default', gulp.series('build', watch));
