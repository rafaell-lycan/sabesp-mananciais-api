var request = require('supertest'),
    app     = require('../../index'),
    debug   = require('debug')('sabesp:test'),
    mongo   = require('../../lib/Mongo'),
    assert  = require('assert');

describe('Routes', function () {
  before(function(done) {
    setTimeout(done, 1000);
  });

  describe('v0', function(){
    before(function(done) {
      mongo.collection('dams').remove({ date: '2015-08-25' },done);
    });

    it('returns today data from sabesp', function(done) {
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

    it('returns some old day and insert into database', function(done) {
      request(app)
        .get('/2015-08-25')
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
    it('returns today data from sabesp', function(done) {
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

    it('returns some old day from database', function(done) {
      request(app)
        .get('/v1/2015-08-25')
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
    it('returns today data from sabesp', function(done) {
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

    it('returns some old day from database', function(done) {
      request(app)
        .get('/v2/2015-08-25')
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
});

