var request = require('supertest'),
    app     = require('../../index'),
    debug   = require('debug')('sabesp:test'),
    assert  = require('assert');

describe('loaderio', function () {
  it('returns loaderio string', function(done) {
    request(app)
      .get('/loaderio-deb75e3581d893735fd6e5050757bdb2')
      .expect(200)
      .end(function(err, res) {
        var result = res.text;

        assert.equal(result, 'loaderio-deb75e3581d893735fd6e5050757bdb2');

        done();
      });
  });
});
