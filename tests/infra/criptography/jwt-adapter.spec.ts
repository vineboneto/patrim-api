import { JwtAdapter } from '@/infra/criptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret_key')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret_key')
  })

  test('Should return accessToken on sign success', async () => {
    const sut = new JwtAdapter('secret_key')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = new JwtAdapter('secret_key')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
