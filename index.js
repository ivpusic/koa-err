'use strict';

/**
 * koa-err
 * @author Ivan Pusic
 *
 */


/**
 * Handling unhandled errors from koa app. If user handles error by itself,
 * this function won't be called. Otherwise it will set to this.body err.message or
 * complete error if err.message is not present.
 *
 * @param {Function} fn Custom callback. You can define your own global handler for errors
 *
 * @api public
 */

function err(fn) {
  return function * (next) {
    try {
      yield next;
    } catch (err) {
      if (fn) {
        fn.call(this, err);
      } else {
        console.log(err);
        this.app.emit('error', err, this);
        this.status = err.status || err.cause.status || 500;
        this.body = err.message || err;
      }
    }
  };
}

/**
 * Expose err
 */

module.exports = err;
