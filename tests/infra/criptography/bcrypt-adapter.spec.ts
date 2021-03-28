import bcrypt from 'bcrypt'
import faker from 'faker'
import { BcryptAdapter } from '@/infra/criptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  }
}))

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const salt = 12
      const sut = new BcryptAdapter(salt)
      const password = faker.internet.password()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })
  })
})
