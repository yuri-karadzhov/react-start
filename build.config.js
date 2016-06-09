var fs = require('fs');

module.exports = {
  src: 'src',
  dst: 'dist',
  host: 'localhost',
  port: 8080,
  lint: {
    code: 'src/**/*.js',
    style: 'src/**/*.scss',
    template: 'src/**/*.html'
  },
  ext: {
    jscs: '.jscsrc',
    jshint: '.jshintrc',
    browserslist: 'browserslist'
  }
};
