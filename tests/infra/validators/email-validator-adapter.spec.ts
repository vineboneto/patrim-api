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
})
