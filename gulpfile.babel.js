'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import request from 'request';

const $$ = plugins();

import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import yargs from 'yargs';

const argv = yargs
  .alias('p', 'production')
  .argv;

import cfg from './build.config';
import wpCfg from './webpack.config.babel';

const IS_DEVELOPMENT = argv.p || process.env.NODE_ENV === 'development';

gulp.task('default', [ 'watch' ]);

gulp.task('watch', () => {
  const config = Object.create(wpCfg);
  config.debug = true;
  config.entry.index.unshift(`webpack-dev-server/client?http://${cfg.host}:${cfg.port}/`);

  const server = new WebpackDevServer(webpack(config), {
    stats: {colors: true}
  });

  server.use('/:path', function(req, res) {
    req.pipe(request('http://localhost:8080/')).pipe(res);
  });

  server.listen(cfg.port, cfg.host, function(err) {
    if(err) throw new $$.util.PluginError('webpack-dev-server', err);
    $$.util.log('[webpack-dev-server]', `http://${cfg.host}:${cfg.port}/`);
  });
});

gulp.task('build', (cb) => {
  webpack(wpCfg, (err, stats) => {
    if(err) throw new $$.util.PluginError('webpack', err);
    $$.util.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    cb();
  });
});

gulp.task('clean', () => {
  // TODO move path to config
  return del(`./${cfg.dst}`);
});

gulp.task('lint', ['lint:code', 'lint:style', 'lint:template']);

gulp.task('code:lint', [ 'lint:code' ]);
gulp.task('lint:code', () => {
  return gulp.src(cfg.lint.code, {base: './'})
    .pipe($$.plumber({
      errorHandler: $$.notify.onError(err => ({
        title: 'Code Lint',
        message: err.message
      }))
    }))
    .pipe($$.cached('lint:code'))
    .pipe($$.jscs({
      configPath: cfg.ext.jscs,
      fix: true
    }))
    .pipe($$.jshint(cfg.ext.jshint))
    .pipe($$.jshint.reporter('jshint-stylish'))
    .pipe($$.jshint.reporter('fail'));
});

gulp.task('style:lint', [ 'lint:style' ]);
gulp.task('lint:style', function() {
  return gulp.src(cfg.lint.style)
    .pipe($$.plumber({
      errorHandler: $$.notify.onError(err => ({
        title: 'Style Lint',
        message: err.message
      }))
    }))
    .pipe($$.cached('lint:style'))
    .pipe($$.sassLint())
    .pipe($$.sassLint.format())
    .pipe($$.sassLint.failOnError());
});

gulp.task('template:lint', [ 'lint:template' ]);
gulp.task('lint:template', function() {
  return gulp.src(cfg.lint.template)
    .pipe($$.plumber({
      errorHandler: $$.notify.onError(err => ({
        title: 'Template Lint',
        message: err.message
      }))
    }))
    .pipe($$.cached('lint:template'))
    .pipe($$.html5Lint());
});
