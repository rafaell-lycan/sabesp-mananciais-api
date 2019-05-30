import 'reflect-metadata';
import { agent, Response } from 'supertest';
import App from '../../src/application';
import { expect } from 'chai';

describe('API V2 Controller', () => {
  const { app } = new App();

  before((done) => {
    setTimeout(done, 1000);
  });

  it('returns data from today using Sabesp API', (done) => {
    agent(app)
      .get('/v2/')
      .expect(200)
      .end((err: any, res: Response) => {
        const { body } = res;
        expect(body.length).to.equal(7);
        expect(body[0].name).to.equal('Cantareira');
        expect(body[0].data.volume_armazenado).to.match(/[0-9]+\s%/);
        done();
      });
  });

  it('returns data from a past date using Sabesp API', (done) => {
    agent(app)
      .get('/v2/2015-08-25')
      .expect(200)
      .end((err: any, res: Response) => {
        const { body } = res;
        expect(body.length).to.equal(6);
        expect(body[0].name).to.equal('Cantareira');
        expect(body[0].data.volume_armazenado).to.match(/[0-9]+\s%/);
        done();
      });
  });

  it('returns a NotFoundError when date is before 2003/1/1', (done) => {
    const date = '/v2/2000/1/1';

    agent(app)
      .get(date)
      .expect(404)
      .end((err: any, res: Response) => {
        const { body } = res;
        expect(body).to.eql({
          httpCode: 404,
          message: `Resource '${date}' not found.`,
          name: 'NotFoundError',
        });
        done();
      });
  });

  it('returns a NotFoundError when date in the future', (done) => {
    const date = '/v2/2049/1/1';

    agent(app)
      .get(date)
      .expect(404)
      .end((err: any, res: Response) => {
        const { body } = res;
        expect(body).to.eql({
          httpCode: 404,
          message: `Resource '${date}' not found.`,
          name: 'NotFoundError',
        });
        done();
      });
  });

  it('returns a NotFoundError when does not follow the format YYYY-MM-DD', (done) => {
    agent(app)
      .get('/v2/anyvalue')
      .expect(500)
      .end((err: any, res: Response) => {
        const { body } = res;
        expect(body).to.eql({
          httpCode: 500,
          message: 'The date format must follow YYYY-MM-DD pattern.',
          name: 'InternalServerError',
        });
        done();
      });
  });
});
