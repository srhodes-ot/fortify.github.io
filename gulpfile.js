const gulp = require('gulp');
const concat = require('gulp-concat');

const bsVersion = 4;
const quantumBasePath = `./node_modules/@micro-focus/quantum-ux-bootstrap/dist`;
const quantumBsBasePath = `${quantumBasePath}/bootstrap${bsVersion}/css`;

gulp.task('npm-components', function(){
  const streams = [];
  streams.push(
    gulp.src([
      // './node_modules/bootstrap/dist/css/bootstrap-reboot.min.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/quantum-ux-bootstrap/dist/css/bootstrap.min.css',
      ...[
        'panels',
        'paper',
      ].map(component => `${quantumBasePath}/common/css/qtm-${component}.css`),
      ...[
        'alert',
        'breadcrumbs',
        'button',
        'panel',
        'checkbox',
        'form',
        'input',
        'list',
        'login',
        'modal',
        'navigation',
        'progress',
        'radio',
        'slider',
        'table',
        'tag',
        'toolbar',
      ].map(component => `${quantumBsBasePath}/${component}/qtm-bs${bsVersion}-${component}.css`),
      './css/site.css'
    ], { allowEmpty: true }).pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'))
  );

  streams.push(
    gulp.src([
      `${quantumBasePath}/common/css/qtm-fonts.css`
    ], { allowEmpty: true }).pipe(gulp.dest('./dist/fonts'))
  );

  streams.push(
    gulp.src( `./assets/img/**/*.*`, { encoding: false }).pipe(gulp.dest('./dist/img'))
  );

  streams.push(
    gulp.src([
      `${quantumBasePath}/common/css/qtm-icons.css`,
      `${quantumBasePath}/common/css/qtm-font-icons.css`,
    ], { allowEmpty: true }).pipe(gulp.dest('./dist/icons'))
  );

  streams.push(
    gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
    ], { allowEmpty: true }).pipe(gulp.dest('./dist/js'))
  );

  // Return a promise that resolves when all streams finish
  return new Promise(function(resolve, reject){
    let remaining = streams.length;
    streams.forEach(function(s){
      s.on('end', function(){
        remaining -= 1;
        if(remaining === 0) resolve();
      });
      s.on('error', reject);
    });
  });
});

// Gulp 4/5: use series instead of dependency arrays
gulp.task('default', gulp.series('npm-components'));

