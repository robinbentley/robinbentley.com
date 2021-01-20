// utilities
import gulp from 'gulp'
import del from 'del'

// styling
import sass from 'gulp-sass'
import cssnano from 'gulp-cssnano'

// images
import imagemin from 'gulp-imagemin'

// html
import htmlmin from 'gulp-htmlmin'

// compile sass and process with cssnano
gulp.task('styles', () => {
  gulp.src('./source/sass/site.sass')
    .pipe(sass({
      indentedSyntax: true,
      includePaths: ['node_modules']
    }))
    .pipe(cssnano({
      autoprefixer: {browsers: ['last 2 versions'], add: true},
      discardComments: {removeAll: true}
    }))
    .pipe(gulp.dest('./static/css/'))
})

// optimize image assets
gulp.task('images', () => {
  gulp.src('./source/images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/images/'))
})

// minify html files (hugo doesn't currently do this by default)
gulp.task('htmlmin', () => {
  gulp.src('./public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./public/'))
})

// default task to watch and compile assets
gulp.task('default', () => {
  gulp.watch('./source/sass/**/*.{sass,scss,css}', gulp.series('styles'));
})
