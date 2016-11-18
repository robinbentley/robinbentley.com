// utilities
import Gulp from 'gulp'
import del from 'del'

// styling
import sass from 'gulp-sass'
import cssnano from 'gulp-cssnano'

// images
import imagemin from 'gulp-imagemin'

// html
import htmlmin from 'gulp-htmlmin'

// compile sass and process with cssnano
Gulp.task('styles', () => {
  Gulp.src('./source/sass/site.sass')
    .pipe(sass({
      indentedSyntax: true,
      includePaths: ['node_modules']
    }))
    .pipe(cssnano({
      autoprefixer: {browsers: ['last 2 versions'], add: true},
      discardComments: {removeAll: true}
    }))
    .pipe(Gulp.dest('./static/css/'))
})

// optimize image assets
Gulp.task('images', () => {
  Gulp.src('./source/images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(Gulp.dest('./static/images/'))
})

// minify html files (hugo doesn't currently do this by default)
Gulp.task('htmlmin', () => {
  Gulp.src('./public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(Gulp.dest('./public/'))
})

// default task to watch and compile assets
Gulp.task('default', () => {
  Gulp.watch('./source/sass/**/*.{sass,scss,css}', ['styles']);
})
