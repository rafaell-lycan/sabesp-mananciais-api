import { agent, Response } from 'supertest';
import { app } from '../../src/application';

describe('api:routes:general', () => {

  it('returns OK', (done) => {
    agent(app)
      .get('/_health')
      .expect(200)
      .end((_: any, res: Response) => {
        expect(res.body).toEqual({ status: 'OK' });
        done();
      });
  });

  it('returns the same Loader.io key the param', (done) => {
    const key = 'loaderio-deb75e3581d893735fd6e5050757bdb2';
    agent(app)
      .get(`/${key}`)
      .expect(200)
      .end((_: any, res: Response) => {
        expect(res.text).toBe(key);
        done();
      });
  });
});
