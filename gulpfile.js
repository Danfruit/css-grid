const {src, dest, series, watch} = require('gulp')
const htmlMin = require('gulp-htmlmin')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const svgSprite = require('gulp-svg-sprite')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
  return del(['dist'])
}

const styles = () => {
  return src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
		.pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const fonts = () => {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts'))
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
      .pipe(svgSprite({
          mode: {
              stack: {
                  sprite: '../sprite.svg'
              }
          },
          shape: {
            dimension: {
              attributes: true
            }
          }
      }))
      .pipe(dest('dist/img'))
}

const scripts = () => {
  return src(
    'src/js/*.js')
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

const libs = () => {
  return src(
    'src/js/lib/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('lib.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js/lib'))
}

const images = () => {
  return src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/*.svg',
      'src/img/**/*.jpeg',
      'src/img/**/*.ico'
  ])
      .pipe(image())
      .pipe(dest('dist/img'))
}

const watchFiles = () => {
  browserSync.init({
      server: {
          baseDir: 'dist'
      }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.css', styles)
watch('./src/js/*.js', scripts);
watch('./src/js/lib/*.js', libs);

watch([
  'img/**/*.jpg',
  'img/**/*.jpeg',
  'img/**/*.png',
  'img/**/*.svg',
], images)


exports.fonts = fonts

exports.default = series(clean, scripts, libs, fonts, styles, htmlMinify, images, svgSprites, watchFiles)
