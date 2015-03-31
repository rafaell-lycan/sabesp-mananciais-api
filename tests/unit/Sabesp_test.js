var app     = require('../../index'),
    Sabesp  = require('../../lib/Sabesp'),
    Helper  = require('../../lib/Helper'),
    assert  = require('assert'),
    token;

describe('Sabesp', function () {
  before(function(done) {
    Sabesp.getToken()
      .then(function(resolve) {
        token = resolve;
        done();
      });
  });

  it('fetch', function(done) {
    Sabesp.fetch('2015-03-31', token)
    .then(function(res) {
      assert.equal(res.date, '2015-03-31');
      assert.equal(res.dams.length, 6);
      done();
    })
    .catch(function(err) {
      console.log(err);
      done();
    });

  });
});

