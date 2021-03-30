import { EmailValidatorAdapter } from '@/infra/validators'

import validator from 'validator'
import faker from 'faker'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const email = faker.internet.email()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(email)
    expect(validatorSpy).toHaveBeenCalledWith(email)
  })

  test('Should return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBe(false)
  })

  test('Should return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBe(true)
  })
})
