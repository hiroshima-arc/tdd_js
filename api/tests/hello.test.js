const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');
const request = supertest(app);

describe('Tests Hello', function() {
  describe('router', function() {
    it('getメソッドであいさつをJSON形式で返す', function(done) {
      request.get('/api/hello').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });

    it('postメソッドであいさつをJSON形式で返す', function(done) {
      request.post('/api/hello').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
      });
    });
  });
});