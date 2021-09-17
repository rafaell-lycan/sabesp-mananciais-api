import { agent, Response } from 'supertest';
import { app } from '../../src/application';

describe('api:routes:v1', () => {
  it('returns data from today using Sabesp API', (done) => {
    agent(app)
      .get('/')
      .expect(200)
      .end((_: any, res: Response) => {
        const { body } = res;
        expect(body).toHaveLength(7);
        expect(body[0].name).toBe('Cantareira');
        expect(body[0].data).toHaveLength(4);
        expect(body[0].data[0].key).toBe('volume armazenado');
        done();
      });
  });

  it('returns data from a past date using Sabesp API', (done) => {
    agent(app)
      .get('/2015-08-25')
      .expect(200)
      .end((_: any, res: Response) => {
        const { body } = res;
        expect(body).toHaveLength(6);
        expect(body[0].name).toBe('Cantareira');
        expect(body[0].data).toHaveLength(4);
        expect(body[0].data[0].key).toBe('volume armazenado');
        done();
      });
  });

  it('returns a NotFoundError when date is before 2003/1/1', (done) => {
    const date = '/2000/1/1';

    agent(app)
      .get(date)
      .expect(404)
      .end((_: any, res: Response) => {
        const { body } = res;
        expect(body).toEqual({
          status: 404,
          message: `Resource '${date}' not found.`,
        });
        done();
      });
  });

  it('returns a NotFoundError when date in the future', (done) => {
    const date = '/2049/1/1';

    agent(app)
      .get(date)
      .expect(404)
      .end((_: any, res: Response) => {
        const { body } = res;
        expect(body).toEqual({
          status: 404,
          message: `Resource '${date}' not found.`,
        });
        done();
      });
  });

  it('returns a NotFoundError when does not follow the format YYYY-MM-DD', (done) => {
    agent(app)
      .get('/anyvalue')
      .expect(500)
      .end((_: any, res: Response) => {
        const { body } = res;
        expect(body).toEqual({
          status: 500,
          message: 'The date format must follow YYYY-MM-DD pattern.',
        });
        done();
      });
  });
});
