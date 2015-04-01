var request = require('supertest'),
    app     = require('../../index'),
    assert  = require('assert');

describe('Sabesp', function () {
  it('returns today data from databaseg', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        var json = res.body;

        assert.equal(json.dams.length, 6);
        assert.equal(json.dams[0].name, 'Cantareira');

        done();
      });
  });
});

