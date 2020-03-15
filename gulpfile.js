var gulp = require('gulp');
let sync = require('browser-sync').create();
var reload = sync.reload;
var include = require("gulp-include");
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var colors = require('colors/safe');
var del = require('del');

sass.compiler = require('node-sass');

// SASS, AUTOPREFIXR, MINIMIZE
gulp.task('sass', function() {
  var processors = [
    autoprefixer({browsers: [
      'last 1 version',
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'last 2 Opera versions',
      'last 2 Edge versions'
      ]})
  ];

  console.log('⬤  Run ' + colors.yellow('Sass') +
              ' + ' +
              colors.green('Autoprefixer') +
              ' + ' +
              colors.cyan('Cssnano') + ' ⬤'
              );

  return gulp.src('_src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/css'))
    .pipe(sync.stream());
});

// WATCH SASS, PREPROCESS AND RELOAD
gulp.task('serve', gulp.series(['sass'],
  function() {
    sync.init({
      ui: false,
      notify: false,
      port: 3000,
      server: {
        baseDir: '.'
      }
  });

  gulp.watch(['_src/**/*.scss'], gulp.series('sass'));
}));

// CLEAN BUILD
gulp.task('clean', function(){
  return del(['build/*'])
  .then(paths => {
    console.log('⬤  Deleted files and folders:\n', paths.join('\n'));
  });
});

// CLEAN BUILD & COPY FILES TO IT
gulp.task('copy', function() {
  console.log(colors.magenta('⬤  Clear build/ and copy files to it... ⬤'));

  return gulp.src(['assets/**/*', '*.html'])
    .pipe(copy('build/'));
});

gulp.task('default', function() {
  console.log(colors.rainbow('⬤  ================================ ⬤\n'));
  console.log('  AVAILABLE COMMANDS:');
  console.log('  ' + colors.cyan('-------------------\n'));
  console.log('  ' + colors.yellow('npm start') +
              ' — run local server with watcher');
  console.log('  ' + colors.green('npm run build') +
              ' — make build of the project');
  console.log('  ' + colors.cyan('npm run deploy') +
              ' — make build and publish project to Github Pages');
  console.log(colors.rainbow('\n⬤  ================================ ⬤'));
});
