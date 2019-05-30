import { expect } from 'chai';
import Sabesp, { SabespResponse } from '../../src/services/Sabesp';

describe('Services: Sabesp', () => {
  const service = Sabesp;

  it('should return a response from Sabesp API', async () => {
    const { FlagHasError, ReturnObj }: SabespResponse = await service.info('2019-1-1');
    expect(FlagHasError).to.false;
    expect(ReturnObj.DataString).to.equal('01/01/2019');
  });
});
