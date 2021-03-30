import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(emailValidatorSpy, 'email')
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct values', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should return Error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.emailValid = false
    const isValid = sut.validate({ email: faker.internet.email() })
    expect(isValid).toEqual(new InvalidParamError('email'))
  })

  test('Should return null if EmailValidator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.validate({ email: faker.internet.email() })
    expect(isValid).toBeNull()
  })
})
