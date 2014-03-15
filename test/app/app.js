'use strict';

var koa = require('koa'),
  route = require('koa-route'),
  fs = require('co-fs'),
  koaErr = require('../../'),
  app = koa(),
  app2 = koa();

/* first app */
app.use(koaErr());
app.use(route.get('/first', function * (next) {
  var dummy = yield fs.readdir('someunknown');
  yield next;
}));

app.use(route.get('/first/ok', function * (next) {
  this.body = {
    status: 'ok'
  };
  yield next;
}));
/* ----- */


/* second app */
app2.use(koaErr(function (err) {
  this.body = 'custom error';
  this.status = 500;
}));

app2.use(route.get('/second', function * (next) {
  var dummy = yield fs.readdir('someunknown');
  yield next;
}));

app2.use(route.get('/second/ok', function * (next) {
  try {
    yield fs.readdir('someunknown');
  } catch (e) {
		this.body = {
			status: 'ok'
		};
  }
  yield next;
}));
/* ----- */

exports.app1 = app.listen(9000);
exports.app2 = app2.listen(9001);
