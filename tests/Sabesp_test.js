var request = require('supertest'),
    app     = require('../index'),
    expect  = require('chai').expect;

describe('Sabesp', function () {
  it('returns today data', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body.length).to.be.equal(6);
        expect(res.body[0].name).to.be.equal('Cantareira');

        done();
      });
  });
});
