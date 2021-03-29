import { BcryptAdapter } from '@/infra/criptography'

import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('any_value_hashed')
  },
  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const sut = makeSut()
      const password = faker.internet.password()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })

    test('Should return a valid on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash(faker.internet.password())
      expect(hash).toBe('any_value_hashed')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
      const promise = sut.hash(faker.internet.password())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      const value = faker.internet.password()
      const hashedValue = faker.random.uuid()
      await sut.comparer(value, hashedValue)
      expect(compareSpy).toHaveBeenCalledWith(value, hashedValue)
    })
  })
})
