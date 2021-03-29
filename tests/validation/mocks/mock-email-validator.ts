import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  email: string
  result = true
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}
