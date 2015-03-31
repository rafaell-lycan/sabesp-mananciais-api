var request = require('supertest'),
    app     = require('../../index'),
    expect  = require('chai').expect;

describe('Sabesp', function () {
  it('returns today data', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        var json = res.body;

        expect(json.dams.length).to.be.equal(6);
        expect(json.dams[0].name).to.be.equal('Cantareira');

        done();
      });
  });
});

