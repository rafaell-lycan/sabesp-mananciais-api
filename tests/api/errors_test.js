var request = require('supertest'),
    app     = require('../../index'),
    debug   = require('debug')('sabesp:test'),
    assert  = require('assert');

describe('Errors', function () {
  it('not found', function(done) {
    request(app)
    .get('/notFound')
      .end(function(err, res) {

        assert.equal(404, res.statusCode);
        assert.deepEqual({ err: 'Not Found' }, res.body);

        done();
      });
  });

  it('favicon', function(done) {
    request(app)
    .get('/favicon.ico')
      .expect(200)
      .end(function(err, res) {

        assert.equal(200, res.statusCode);
        assert.equal('', res.body);

        done();
      });
  });
});
