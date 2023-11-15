//Code for gulp 
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const fs = require('fs');
const exit = require('gulp-exit');
//GULP task to automate linting//
gulp.task('lint', async() => {
    return gulp.src(['src/app.js','!node_modules/**'])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html')))
        .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
        .pipe(eslint.failAfterError());
});
 //GULP task to automate linting// 
gulp.task('test', async() => {
  return await gulp.src(['specs/*.js','!gulpfile.js'])
 // gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(jasmine({
       reporter: new reporters.JUnitXmlReporter({
         savePath: 'testReport/JUnit/'
      })
    }))
	//gulp-exit ensures the tark terminates after finishing
    .pipe(exit())
});
gulp.task('pre-coverage', function () {
  return gulp.src(['specs/*.js', '!gulpfile.js', '!node_modules/**'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});
  gulp.task('coverage', gulp.series('pre-coverage',async function ()  {
    return gulp.src(['specs/*.js'])
      .pipe(jasmine())
      // Creating the reports after tests ran
      .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [ 'lcovonly', 'json', 'text', 'text-summary', 'cobertura' ],
        reportOpts: {
          lcov: {dir: 'coverage/lcovonly', file: 'lcov.info'},
          json: {dir: 'coverage/json', file: 'converage.json'},
          cobertura: {dir: 'coverage/cobertura', file: 'cobertura-coverage.xml'}
        }}))
      // Enforce a coverage of at least 60%
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
      .pipe(exit());
  }));
