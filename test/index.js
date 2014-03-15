'use strict';

var apps = require('./app/app'),
  request = require('supertest');


describe('GET', function () {
  describe('first app', function () {
    it('sould throw error on /first', function (done) {
      request(apps.app1)
        .get('/first')
        .expect(500, done);
    });

    it('sould not throw error on /first/ok', function (done) {
      request(apps.app1)
        .get('/first/ok')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('second app', function () {
    it('should throw error on /second', function (done) {
      request(apps.app2)
        .get('/second')
        .expect(500, done);
    });

    it('should now throw error on /second/ok', function (done) {
      request(apps.app2)
        .get('/second/ok')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
