import { EmailValidation } from '@/validation/validators'
import { EmailValidator } from '@/validation/protocols'

import faker from 'faker'

class EmailValidatorSpy implements EmailValidator {
  email: string
  result = true
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct values', () => {
    const emailValidatorSpy = new EmailValidatorSpy()
    const email = faker.internet.email()
    const sut = new EmailValidation(emailValidatorSpy, 'email')
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })
})
