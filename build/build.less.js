const less = require('gulp-less')
const path = require('path')
const del = require('del')
const { src, dest, series } = require('gulp')

function clean() {
  return del(['../style'], { force: true })
}

function compile() {
  return src('../packages/**/*.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
      })
    )
    .pipe(dest('../style'))
}

exports.build = series(clean, compile)
