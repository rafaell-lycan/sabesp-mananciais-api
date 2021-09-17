import { getDamnsInformation } from '../../src/services/sabesp'

describe('getDamnsInformation', () => {
  it('returns a response from Sabesp API', async () => {
    const { FlagHasError, ReturnObj } = await getDamnsInformation('2019-1-1')
    expect(FlagHasError).toBeFalsy()
    expect(ReturnObj.DataString).toBe('01/01/2019')
  })

  it('throws an error from Sabesp API', async () => {
    await expect(() => getDamnsInformation('foo')).rejects.toThrow();
  })
})
