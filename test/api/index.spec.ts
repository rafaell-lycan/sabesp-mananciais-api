import 'reflect-metadata';
import { agent, Response } from 'supertest';
import App from '../../src/application';
import { expect } from 'chai';

describe('Index Controller', () => {
  const { app } = new App();

  before((done) => {
    setTimeout(done, 1000);
  });

  it('should return OK', (done) => {
    agent(app)
      .get('/health')
      .expect(200)
      .end((err: any, res: Response) => {
        expect(res.body).eql({ status: 'OK' });
        done();
      });
  });

  it('should return Loader.io key', (done) => {
    agent(app)
      .get('/loaderio-deb75e3581d893735fd6e5050757bdb2')
      .expect(200)
      .end((err: any, res: Response) => {
        expect(res.text).eql('deb75e3581d893735fd6e5050757bdb2');
        done();
      });
  });
});
