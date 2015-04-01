var request = require('supertest'),
    app     = require('../../index'),
    assert  = require('assert');

describe('Routes', function () {
  describe('v0', function(){
    it('returns today data from database', function(done) {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          var json = res.body;

          assert.equal(json.length, 6);
          assert.equal(json[0].name, 'Cantareira');

          done();
        });
    });
  });

  describe('v1', function(){
    it('returns today data from database', function(done) {
      request(app)
        .get('/v1')
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

  describe('v2', function(){
    it('returns today data from database', function(done) {
      request(app)
        .get('/v2')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          var json = res.body;

          assert.equal(json[0].name, 'Cantareira');
          assert.ok(/[0-9]+\s%/.test(json[0].data.volume_armazenado));

          done();
        });
    });
  });
});

