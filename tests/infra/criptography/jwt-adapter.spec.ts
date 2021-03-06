import { JwtAdapter } from '@/infra/criptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  },

  async verify (): Promise<string> {
    return Promise.resolve('any_valid_token')
  }
}))

const makeSut = (): JwtAdapter => new JwtAdapter('secret_key')

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret_key')
    })

    test('Should return accessToken on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt', () => {
    test('Should call verify with correct value', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret_key')
    })

    test('Should return valid token if verify returns token', async () => {
      const sut = makeSut()
      const token = await sut.decrypt('any_token')
      expect(token).toEqual('any_valid_token')
    })
  })
})
