// 
// this gulpfile can be use in development to speed up compiliation time
// it must be ran using node 8+ and gulp 4+
// gulp --gulpfile gulpfile-watch.js
//

var gulp = require('gulp');
var ts = require('gulp-typescript');
 
var tsProject = ts.createProject({
    declaration: true,
    module: 'es2015',
    rootDir: 'src',
    moduleResolution: 'node',
    "target": "es5",
    lib: [
      "es2017",
      "dom"
    ],
    "typeRoots": ["node_modules/@types", "custom_typings"],
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "strictNullChecks": false,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "noEmitHelpers": false,
    "allowSyntheticDefaultImports": true
});
 
function scripts() {
  return gulp.src('src/**/*.ts')
      .pipe(tsProject())
      .pipe(gulp.dest('dist/native-modules'));
}

function copyHTML() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist/native-modules"))
}

function copyCSS() {
  return gulp.src("src/**/*.css")
    .pipe(gulp.dest("dist/native-modules"))
}

function copyJSON() {
  return gulp.src("src/**/*.json")
    .pipe(gulp.dest("dist/native-modules"))
}

function copySCSS() {
  return gulp.src("src/**/*.scss")
    .pipe(gulp.dest("dist/native-modules"))
}

function watchFiles() {
  gulp.watch('src/**/*.css', copyCSS);
  gulp.watch('src/**/*.html', copyHTML);
  gulp.watch('src/**/*.scss', copySCSS);
  gulp.watch('src/**/*.ts', scripts);
}

var copy = gulp.parallel(copyHTML, copyCSS, copyJSON, copySCSS);
var build = gulp.parallel(scripts, copy);
var watch = gulp.series(build, watchFiles);

exports.default = build;
exports.copy = copy;
exports.build = build;
exports.scripts = scripts;
exports.watch = watch;